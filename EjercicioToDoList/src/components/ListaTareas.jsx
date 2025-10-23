import Tarea from './Tarea';

const ListaTareas = ({ listaTareas, borrarTarea, completaTarea }) => {
    return (
        <>
            {listaTareas.map((tarea, index) => (
                <Tarea
                    key={index}
                    tarea={tarea}
                    index={index}
                    borrarTarea={borrarTarea}
                    completaTarea={completaTarea}
                />
            ))}
        </>
    );
};

export default ListaTareas;