import { useState } from 'react';
import FormularioTarea from './FormularioTarea.jsx';
import ListaTareas from './ListaTareas.jsx';

export default function Todo() {
    //Lista de tareas 
    const [listaTareas, setListaTareas] = useState([]);

    const addTarea = (texto) => {
        setListaTareas([...listaTareas, { texto, completada: false }]);
    };

    const borrarTarea = (index) => {
        const nuevaLista = listaTareas.filter((_, i) => i !== index);
        setListaTareas(nuevaLista);
    };

    const completaTarea = (index) => {
        const nuevaLista = listaTareas.map((tarea, i) => {
            if (i === index) {
                return { ...tarea, completada: !tarea.completada };
            }
            return tarea;
        });
        setListaTareas(nuevaLista);
    };

    return (
        <>
            <FormularioTarea onAddTarea={addTarea} />
            <ListaTareas 
                listaTareas={listaTareas}
                borrarTarea={borrarTarea}
                completaTarea={completaTarea}
            />
        </>
    );
}