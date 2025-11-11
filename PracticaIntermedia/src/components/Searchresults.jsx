function SearchResults({ results, onShowClick }) {
    return(
        <div className="results">
            {results.map((show) => (
                <ShowCard key={show.id} show={show} onShowClick={onShowClick} />
            ))}
        </div>
    );
}