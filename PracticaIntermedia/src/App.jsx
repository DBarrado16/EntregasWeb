import { useState } from 'react'
import Searchbar from './components/Searchbar.jsx'
import './App.css'
import { set } from 'react-hook-form';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  //funcion para llamar al api
  const handleSearch = async(id) => {

    //primero limpio por si hay errores
    setError(null);

    //segundo intento llamar al api
    try{
      //tercero hago la peticion
      const response = await fetch(`https://api.tvmaze.com/shows`);

      //cuarto verifico que la respuesta esté bien
      if(!response.ok){
        throw new Error("Error al buscar la serie");
      }

      //cinco lo trannsformo a json
      const data = await response.json();

      //seis filtro los resultados
      const filteredResults = data.filter(show =>
        show.name.toLowerCase().includes(id.toLowerCase())
      );

      //septimo guardo los resultados filtrados
      setSearchResults(filteredResults);

    }catch(err){
      //ultimo, si fallo guardo el error
      setError(err.message);
      setSearchResults([]);//Limpio los resultados en caso de error
    }
  }

  return (
    <>
      <h1>TVMaze</h1>
      <Searchbar onSearch={handleSearch}/>
    </>
  )
}

export default App
