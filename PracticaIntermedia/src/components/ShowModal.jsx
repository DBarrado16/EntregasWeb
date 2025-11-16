function ShowModal({ show, onClose }) {
  
  // Si no hay serie seleccionada, no mostrar nada
  if (!show) {
    return null;
  }
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button onClick={onClose}>Cerrar X</button>
        
        <h2>{show.name}</h2>
        
        {show.image && <img src={show.image.medium} alt={show.name} />}
        
        <p><strong>Idioma:</strong> {show.language}</p>
        
        <p><strong>Géneros:</strong> {show.genres.join(', ')}</p>
        
      </div>
    </div>
  );
}

export default ShowModal;