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
    const savedFavourites = localStorage.getItem('favourites');
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  // Al cargar la app, obtener una muestra aleatoria de series para mostrar
  useEffect(() => {
    const fetchRandomShows = async () => {
      try {
        const page = Math.floor(Math.random() * 20); // páginas disponibles en TVMaze
        const response = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
        if (!response.ok) throw new Error('Error al obtener series aleatorias');
        const data = await response.json();

        // Mezclar y seleccionar algunas series para mostrar
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 8);

        // Adaptar al formato que usa SearchResults: [{ show: {...} }, ...]
        const results = selected.map(show => ({ show }));
        setSearchResults(results);
      } catch (err) {
        console.error('No se pudieron cargar series aleatorias:', err);
      }
    };

    fetchRandomShows();
  }, []);

  const handleToggleFavourite = (show) => {
    console.log("Toggle favorito para:", show.name);
    const isAlreadyFavourite = favourites.some(fav => fav.id === show.id);
    console.log("¿Ya es favorito?", isAlreadyFavourite);
    
    let newFavourites;

    if (isAlreadyFavourite) {
      newFavourites = favourites.filter(fav => fav.id !== show.id);
      console.log("Quitando de favoritos");
    } else {
      newFavourites = [...favourites, show];
      console.log("Añadiendo a favoritos");
    }

    console.log("Nuevos favoritos:", newFavourites);
    setFavourites(newFavourites);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));
  };


  return (
    <>
      <h1>DoroSTAR PLUS+</h1>
      <Searchbar onSearch={handleSearch}/>

      {error && <p className="error">{error}</p>}

      
      <button onClick={() => setShowFavourites(!showFavourites)}>
        {showFavourites ? 'Ocultar' : 'Ver'} Favoritos ({favourites.length}) 
      </button>

      {showFavourites && (
        <FavouritesList
          favourites={favourites}
          onShowClick={handleShowClick}
          onToggleFavourite={handleToggleFavourite}
        />
      )}

      <SearchResults 
        results={searchResults} 
        onShowClick={handleShowClick} 
        favourites={favourites}
        onToggleFavourite={handleToggleFavourite}
      />

      <ShowModal show={selectedShow} onClose={handleCloseModal} />
    </>
  )
}

export default App