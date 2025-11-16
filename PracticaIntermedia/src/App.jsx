import { useState } from 'react'
import Searchbar from './components/Searchbar.jsx'
import SearchResults from './components/Searchresults.jsx'
import ShowModal from './components/ShowModal.jsx'
import './App.css'
import { set } from 'react-hook-form';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  //funcion para llamar al api
  const handleSearch = async(id) => {

    console.log("Buscando serie: ", id);

    //primero limpio por si hay errores
    setError(null);

    //segundo intento llamar al api
    try{
      //tercero hago la peticion
      console.log("2. Haciendo fetch...");
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${id}`);

      //cuarto verifico que la respuesta esté bien
      if(!response.ok){
        throw new Error("Error al buscar la serie");
      }

      //cinco lo transformo a json
      const data = await response.json();
      console.log("3. Datos recibidos: ", data);

      //seis guardo los resultados
      setSearchResults(data);

    }catch(err){
      //ultimo, si fallo guardo el error
      console.log("5. Error:", err);
      setError(err.message);
      setSearchResults([]);//Limpio los resultados en caso de error
    }
  }

  const handleShowClick = (show) => {
    console.log("Click en show:", show);
    setSelectedShow(show);
  };

  const handleCloseModal = () => {
    setSelectedShow(null);
  }

  return (
    <>
      <h1>TVMaze</h1>
      <Searchbar onSearch={handleSearch}/>

      {error && <p className="error">{error}</p>}

      <SearchResults results={searchResults} onShowClick={handleShowClick} />

      <ShowModal show={selectedShow} onClose={handleCloseModal} />{ }
    </>
  )
}

export default App