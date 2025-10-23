import {useState} from 'react';
import ListaTareas from './ListaTareas.jsx';

export default function InputTarea() {
    
    //El input de la tarea
    const [tarea, setTarea] = useState('');
    //Lista de tareas 
    const [listaTareas, setListaTareas] = useState([]);

    //Funcion que cuando se pulsa el boton, añade la tarea al array de tareas y pone el input a vacio
    const añadeTarea = (evento) => {
        evento.preventDefault();
        setListaTareas([...listaTareas, { texto: tarea, completada: false }]);
        setTarea("");
    }

    //Funcion que borra la tarea al pulsar el boton de la X
    const borrarTarea = (index) => {
        const nuevaLista = listaTareas.filter((tarea, i) =>{
            return i !== index;
        });
        setListaTareas(nuevaLista);
    }

    //Funcion que tacha la tarea al pulsar el boton de Hecho
    const completaTarea = (index) => {
        const nuevaLista = listaTareas.map((tarea, i) => {
            if (i === index) {
                return { ...tarea, completada: !tarea.completada };
            }
            return tarea;
        });
        setListaTareas(nuevaLista);
    };

    return(
        <>
            <form className="task-form">
                <input 
                    className="task-input"
                    type="text" 
                    placeholder="Escribe una tarea"
                    value = {tarea}
                    onChange={(e) => setTarea(e.target.value)}
                ></input>
                <button className="btn-add" onClick={añadeTarea}>Añadir</button>
            </form>    
            
            <ListaTareas 
                listaTareas={listaTareas}
                borrarTarea={borrarTarea}
                completaTarea={completaTarea}
            />
        </>
    );
}