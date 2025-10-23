import {useState} from 'react';

const ListaTareas = ({listaTareas, borrarTarea, completaTarea}) => {
    return(
        <>
            {listaTareas.map((tarea, index) => (
                <div key={index} className="task-item">
                    <span className={`task-text ${tarea.completada ? 'completed' : ''}`}>
                        {tarea.texto}
                    </span>
                    <div className="button-group">
                        <button className="btn-complete" onClick={() => completaTarea(index)}>
                            {tarea.completada ? '↺' : '✓'}
                        </button>
                        <button className="btn-delete" onClick={() => borrarTarea(index)}>X</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ListaTareas;