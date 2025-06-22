import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- CONFIGURACIÓN ---
// Asegúrate de que esta URL apunte a tu backend.
// Si tu backend corre en el puerto 5001, esta es la URL correcta.
const API_BASE_URL = 'http://localhost:5001/api/admin';

// --- COMPONENTE DEL PANEL DE ADMINISTRADOR ---
const AdminPanel = () => {
    // Estado para almacenar el texto del `systemInstruction`
    const [context, setContext] = useState('');
    // Estado para manejar los mensajes de notificación al usuario
    const [notification, setNotification] = useState({ message: '', type: '' });
    // Estado para el indicador de carga
    const [isLoading, setIsLoading] = useState(false);

    // useEffect se ejecuta una vez cuando el componente se carga por primera vez
    useEffect(() => {
        const fetchContext = async () => {
            setIsLoading(true);
            try {
                // Hacemos la petición GET para obtener el contexto actual
                const response = await axios.get(`${API_BASE_URL}/contexto`);
                setContext(response.data.systemInstruction);
            } catch (error) {
                console.error("Error al obtener el contexto:", error);
                setNotification({ message: 'Error: No se pudo cargar el contexto del bot.', type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };

        fetchContext();
    }, []); // El array vacío asegura que se ejecute solo una vez

    // Función que se ejecuta al guardar los cambios
    const handleSaveChanges = async () => {
        setIsLoading(true);
        setNotification({ message: '', type: '' }); // Limpiar notificaciones previas
        try {
            // Hacemos la petición POST para enviar el nuevo contexto
            await axios.post(`${API_BASE_URL}/contexto`, {
                newInstruction: context
            });
            setNotification({ message: '¡Contexto actualizado con éxito!', type: 'success' });
        } catch (error) {
            console.error("Error al guardar el contexto:", error);
            setNotification({ message: 'Error: No se pudo guardar el nuevo contexto.', type: 'error' });
        } finally {
            setIsLoading(false);
            // Hacer que la notificación desaparezca después de 5 segundos
            setTimeout(() => setNotification({ message: '', type: '' }), 5000);
        }
    };

    return (
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-white text-center">
                Panel de Administrador del Chatbot
            </h1>

            <div>
                <label htmlFor="context" className="block mb-2 text-sm font-medium text-slate-300">
                    Personalidad del Bot (System Instruction)
                </label>
                <textarea
                    id="context"
                    rows={10}
                    className="block p-4 w-full text-sm text-slate-100 bg-slate-900 rounded-lg border border-slate-700 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Escribe aquí la personalidad o el contexto de tu bot..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    disabled={isLoading}
                />
            </div>

            <button
                onClick={handleSaveChanges}
                disabled={isLoading}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 ease-in-out disabled:bg-slate-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Guardando...
                    </>
                ) : (
                    'Guardar Cambios'
                )}
            </button>
            
            {/* Contenedor de notificaciones */}
            {notification.message && (
                <div 
                    className={`p-4 text-sm rounded-lg text-center ${
                        notification.type === 'success' 
                        ? 'bg-green-800 text-green-200' 
                        : 'bg-red-800 text-red-200'
                    }`}
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <AdminPanel />
    </div>
  );
}

export default App;
