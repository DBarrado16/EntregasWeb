import React from 'react';

export default function Tarea({ tarea, index, borrarTarea, completaTarea }) {
    return (
        <div className={`task-item ${tarea.completada ? 'completed' : ''}`}>
            <span className="task-text">{tarea.texto}</span>
            <div className="task-actions">
                <button className="btn-complete" onClick={() => completaTarea(index)}>
                    {tarea.completada ? 'Deshacer' : 'Hecho'}
                </button>
                <button className="btn-delete" onClick={() => borrarTarea(index)}>
                    X
                </button>
            </div>
        </div>
    );
}