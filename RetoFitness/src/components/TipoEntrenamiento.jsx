import { useState } from "react";
import { saveData } from "../utils/storage";

const TipoEntrenamiento = ({ nextStep, prevStep }) => {
  const [entrenamiento, setEntrenamiento] = useState("");

  const handleClick = (tipo) => {
    setEntrenamiento(tipo);
    saveData("tipoEntrenamiento", tipo); 
  };

  return (
    <div className="form-container">
      <h3>Selecciona tu tipo de entrenamiento:</h3>
      <div className="training-options">
        <button className={`btn ${entrenamiento === 'fuerza' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => handleClick("fuerza")}>
          Fuerza
        </button>
        <button className={`btn ${entrenamiento === 'cardio' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleClick("cardio")}>
          Cardio
        </button>
        <button className={`btn ${entrenamiento === 'hiit' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleClick("hiit")}>
          HIIT
        </button>
      </div>

      {entrenamiento && (
        <div className="selection-feedback">
          <h4>Has seleccionado: {entrenamiento}</h4>
        </div>
      )}

      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>Anterior</button>
        <button type="button" className="btn btn-primary" onClick={nextStep}>Siguiente</button>
      </div>
    </div>
  );
};

export default TipoEntrenamiento;
