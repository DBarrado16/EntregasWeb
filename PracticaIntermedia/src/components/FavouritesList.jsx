function FavouritesList({ favourites, onShowClick, onRemoveFavourite }) {
    return(
        <>
            <h2>Favoritos</h2>
            {favourites.length === 0 ? (
                <p>No hay series favoritas.</p>
            ) : (
                favourites.map((fav) => (
                    <div key={fav.id}>
                        <ShowCard show={fav} onShowClick={onShowClick} />
                        <button onClick={() => onRemoveFavourite(fav.id)}>Eliminar</button>
                    </div>
                ))
            )}
        </>
    );
}

export default FavouritesList;