/*En este archivo lo que haré será una barra de búsqueda hecha con reactHookForm que me muestre los resultados*/
import { useState } from "react";
import { set } from "react-hook-form";

function Searchbar({onSearch}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (serie) => {
        const value = serie.target.value;
        setSearchTerm(value);

        onSearch(value);
    };

    return(
        <>
            <h3>Busqueda</h3>
            <div>
                <input 
                    type="text" 
                    placeholder="Ej: Peaky Blinders"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Buscar</button>
        </>
    );
};

export default Searchbar;