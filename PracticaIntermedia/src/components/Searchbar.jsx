/*En este archivo lo que haré será una barra de búsqueda hecha con reactHookForm que me muestre los resultados*/
import { useForm } from "react-hook-form";

const Searchbar = ({onSearch}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (serie) => {
        onSearch(serie.serie);
        console.log(serie);
    }

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Busqueda</h3>
                <div>
                    <input 
                        type="text" 
                        placeholder="Ej: Peaky Blinders"
                        {...register("serie", {required: "Busca una serie..."})}
                    />
                    {errors.serie && <p>{errors.serie.message}</p>}
                </div>
                <button type="submit">Buscar</button>
            </form>
        </>
    );
};

export default Searchbar;