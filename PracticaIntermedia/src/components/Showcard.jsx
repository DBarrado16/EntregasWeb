function ShowCard({ show, onShowClick }){
    return(
        <div onClick={() => onShowClick(show)}>
            <img src={show.image?.medium} alt={show.name} />
            <h3>{show.name}</h3>
        </div>
    )
}

export default ShowCard;