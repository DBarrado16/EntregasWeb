import ShowCard from "./Showcard.jsx";

function FavouritesList({ favourites, onShowClick, onToggleFavourite }) {
    if(favourites.length === 0){
        return(<p>No hay series favoritas.</p>);
    }

    return(
        <>
            <h2>Lista de Favoritos</h2>
            <div>
                {favourites.map((show) => (
                    <ShowCard
                        key={show.id}
                        show={show}
                        onShowClick={onShowClick}
                        onToggleFavourite={onToggleFavourite}
                        isFavourite={true}
                    />
                ))}
            </div>
        </>
    );
}

export default FavouritesList;