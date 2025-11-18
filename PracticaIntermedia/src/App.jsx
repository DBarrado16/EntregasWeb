import { useState } from 'react'
import { useEffect } from 'react'
import Searchbar from './components/Searchbar.jsx'
import SearchResults from './components/Searchresults.jsx'
import ShowModal from './components/ShowModal.jsx'
import FavouritesList from './components/FavouritesList.jsx'
import './App.css'
import { set } from 'react-hook-form';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);

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

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavourites(JSON.parse(savedFavorites));
    }
  }, []);

  
const addToFavourites = (show) => {
  if (!favourites.some(fav => fav.id === show.id)) {
    const updatedFavourites = [...favourites, show];
    setFavourites(updatedFavourites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavourites));
  }
};

const removeFromFavourites = (showId) => {
  const updatedFavourites = favourites.filter(fav => fav.id !== showId);
  setFavourites(updatedFavourites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavourites));
};


  return (
    <>
      <h1>Busqueda en API TVMaze</h1>
      <Searchbar onSearch={handleSearch}/>

      {error && <p className="error">{error}</p>}

      
      <button onClick={() => setShowFavourites(!showFavourites)}>
        {showFavourites ? 'Ver resultados' : 'Ver favoritos'}
      </button>



      <SearchResults results={searchResults} onShowClick={handleShowClick} />

      <ShowModal show={selectedShow} onClose={handleCloseModal} />{ }
    </>
  )
}

export default App