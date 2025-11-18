function ShowCard({ show, onShowClick, onToggleFavourite, isFavourite }) {

    const handleFavouriteClick = (e) => {
        e.stopPropagation();
        onToggleFavourite(show);
    };

    return(
        <div className="show-card" onClick={() => onShowClick(show)}>
            <button className="favourite-btn" onClick={handleFavouriteClick}>
                {isFavourite ? '★' : '☆'}
            </button>
            <img src={show.image?.medium} alt={show.name} />
            <h3>{show.name}</h3>
        </div>
    )
}

export default ShowCard;