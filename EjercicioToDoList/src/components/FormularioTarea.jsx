import React, { useState } from 'react';

export default function FormularioTarea({ onAddTarea }) {
    const [tarea, setTarea] = useState('');

    const handleSubmit = (evento) => {
        evento.preventDefault();
        onAddTarea(tarea);
        setTarea('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input 
                className="task-input"
                type="text" 
                placeholder="Escribe una tarea"
                value={tarea}
                onChange={(e) => setTarea(e.target.value)}
            />
            <button className="btn-add" type="submit">Añadir</button>
        </form>
    );
}