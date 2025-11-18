import ShowCard from './Showcard.jsx';

function SearchResults({ results, onShowClick, favourites, onToggleFavourite }) {
    return(
        <div className="results">
            {results.map((result) => {
                const isFavourite = favourites.some(fav => fav.id === result.show.id);

                return (
                    <ShowCard 
                        key={result.show.id} 
                        show={result.show} 
                        onShowClick={onShowClick}
                        onToggleFavourite={onToggleFavourite}
                        isFavourite={isFavourite}
                    />
                );
            })}
        </div>
    );
}

export default SearchResults;