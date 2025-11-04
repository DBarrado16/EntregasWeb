import { useState } from "react";
import { saveData } from "../utils/storage";  // Usamos las funciones de storage

const TipoEntrenamiento = ({ nextStep, prevStep }) => {
  const [entrenamiento, setEntrenamiento] = useState("");

  const handleClick = (tipo) => {
    setEntrenamiento(tipo);
    saveData("tipoEntrenamiento", tipo); // Guardamos la selección en localStorage
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Selecciona tu tipo de entrenamiento:</h3>
      <button onClick={() => handleClick("fuerza")} style={{ margin: "10px" }}>
        Fuerza
      </button>
      <button onClick={() => handleClick("cardio")} style={{ margin: "10px" }}>
        Cardio
      </button>
      <button onClick={() => handleClick("hiit")} style={{ margin: "10px" }}>
        HIIT
      </button>

      {entrenamiento && (
        <div style={{ marginTop: "20px" }}>
          <h4>Has seleccionado: {entrenamiento}</h4>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <button type="button" onClick={prevStep}>Anterior</button>
        <button type="button" onClick={nextStep}>Siguiente</button>
      </div>
    </div>
  );
};

export default TipoEntrenamiento;
