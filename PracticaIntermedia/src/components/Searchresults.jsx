import ShowCard from './Showcard.jsx';

function SearchResults({ results, onShowClick }) {
    return(
        <div className="results">
            {results.map((result) => (
                <ShowCard key={result.show.id} show={result.show} onShowClick={onShowClick} />
            ))}
        </div>
    );
}

export default SearchResults;