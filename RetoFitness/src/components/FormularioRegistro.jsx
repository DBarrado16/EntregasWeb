import { useState, useRef, useEffect } from "react";
import NombreApellidosForm from "./NombreApellidosForm";
import DireccionForm from "./DireccionForm";
import CodigoPostalForm from "./CodigoPostalForm";
import CorreoForm from "./CorreoForm";
import TipoEntrenamiento from "./TipoEntrenamiento";
import DatosDePago from "./DatosDePagoForm";
import { getData, saveData } from "../utils/storage";

const FormularioRegistro = () => {
  const [step, setStep] = useState(1); // Paso actual del formulario
  const [formData, setFormData] = useState({}); // Almacenar datos del formulario
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);

  const nextStep = () => {
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  // Escuchar los submit de los formularios hijos (sin modificar los componentes hijos)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onFormSubmit = (e) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      const fd = new FormData(form);
      const obj = {};
      for (const [k, v] of fd.entries()) obj[k] = v;
      setFormData((prev) => ({ ...prev, ...obj }));
    };

    container.addEventListener("submit", onFormSubmit, true);
    return () => container.removeEventListener("submit", onFormSubmit, true);
  }, []);

  const buildMergedData = () => {
    let merged = { ...formData };
    const tipo = getData("tipoEntrenamiento");
    if (tipo) merged.tipoEntrenamiento = tipo;
    const datosPago = getData("datosPago");
    if (datosPago && typeof datosPago === "object") merged = { ...merged, ...datosPago };
    return merged;
  };

  const handleFinalSubmit = () => {
    const final = buildMergedData();
    try { saveData("registroCompleto", final); } catch (e) {}
    console.log("Registro final enviado:", final);
    setSubmitted(true);
  };

  return (
    <div ref={containerRef}>
      {step === 1 && <NombreApellidosForm nextStep={nextStep} />}
      {step === 2 && <DireccionForm nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <CodigoPostalForm nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <CorreoForm nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && <TipoEntrenamiento nextStep={nextStep} prevStep={prevStep} />}
      {step === 6 && <DatosDePago nextStep={nextStep} prevStep={prevStep} />}

      {step === 7 && (
        <div className="summary-container">
          <h3>Resumen (revisa antes de enviar)</h3>
          {submitted ? (
            <div className="success-message">
              <p>Registro enviado correctamente.</p>
            </div>
          ) : (
            (() => {
              const data = buildMergedData();
              return (
                <div>
                  <ul className="summary-list">
                    <li className="summary-item"><span className="summary-label">Nombre:</span> <span className="summary-value">{data.nombre || "-"}</span> <button className="btn btn-secondary" onClick={() => setStep(1)}>Editar</button></li>
                    <li className="summary-item"><span className="summary-label">Apellidos:</span> <span className="summary-value">{data.apellidos || "-"}</span> <button className="btn btn-secondary" onClick={() => setStep(1)}>Editar</button></li>
                    <li className="summary-item"><span className="summary-label">Dirección:</span> <span className="summary-value">{data.direccion || "-"}</span> <button className="btn btn-secondary" onClick={() => setStep(2)}>Editar</button></li>
                    <li className="summary-item"><span className="summary-label">Código Postal:</span> <span className="summary-value">{data.codigoPostal || "-"}</span> <button className="btn btn-secondary" onClick={() => setStep(3)}>Editar</button></li>
                    <li className="summary-item"><span className="summary-label">Correo:</span> <span className="summary-value">{data.correo || "-"}</span> <button className="btn btn-secondary" onClick={() => setStep(4)}>Editar</button></li>
                    <li className="summary-item"><span className="summary-label">Tipo de entrenamiento:</span> <span className="summary-value">{data.tipoEntrenamiento || "-"}</span> <button className="btn btn-secondary" onClick={() => setStep(5)}>Editar</button></li>
                    <li className="summary-item"><span className="summary-label">Número de tarjeta:</span> <span className="summary-value">{data.numeroTarjeta || "-"}</span> <button className="btn btn-secondary" onClick={() => setStep(6)}>Editar</button></li>
                    <li className="summary-item"><span className="summary-label">Fecha de vencimiento:</span> <span className="summary-value">{data.fechaVencimiento || "-"}</span> <button className="btn btn-secondary" onClick={() => setStep(6)}>Editar</button></li>
                  </ul>
                  <div className="button-group">
                    <button className="btn btn-secondary" onClick={prevStep}>Volver</button>
                    <button className="btn btn-primary" onClick={handleFinalSubmit}>Enviar</button>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
};

export default FormularioRegistro;
