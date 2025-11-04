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
    try { saveData("registroCompleto", final); } catch (e) { /* noop */ }
    console.log("Registro final enviado:", final);
    setSubmitted(true);
  };

  return (
    <div ref={containerRef}>
      {/* Mostrar los formularios según el paso */}
      {step === 1 && <NombreApellidosForm nextStep={nextStep} />}
      {step === 2 && <DireccionForm nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <CodigoPostalForm nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <CorreoForm nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && <TipoEntrenamiento nextStep={nextStep} prevStep={prevStep} />}
      {step === 6 && <DatosDePago nextStep={nextStep} prevStep={prevStep} />}

      {/* Paso 7: resumen editable y botón de envío */}
      {step === 7 && (
        <div style={{ textAlign: "left", display: "inline-block", marginTop: 20 }}>
          <h3>Resumen (revisa antes de enviar)</h3>
          {submitted ? (
            <div>
              <p style={{ color: "green" }}>Registro enviado correctamente.</p>
            </div>
          ) : (
            (() => {
              const data = buildMergedData();
              return (
                <div>
                  <ul>
                    <li><strong>Nombre:</strong> {data.nombre || "-"} <button onClick={() => setStep(1)}>Editar</button></li>
                    <li><strong>Apellidos:</strong> {data.apellidos || "-"} <button onClick={() => setStep(1)}>Editar</button></li>
                    <li><strong>Dirección:</strong> {data.direccion || "-"} <button onClick={() => setStep(2)}>Editar</button></li>
                    <li><strong>Código Postal:</strong> {data.codigoPostal || "-"} <button onClick={() => setStep(3)}>Editar</button></li>
                    <li><strong>Correo:</strong> {data.correo || "-"} <button onClick={() => setStep(4)}>Editar</button></li>
                    <li><strong>Tipo de entrenamiento:</strong> {data.tipoEntrenamiento || "-"} <button onClick={() => setStep(5)}>Editar</button></li>
                    <li><strong>Número de tarjeta:</strong> {data.numeroTarjeta || "-"} <button onClick={() => setStep(6)}>Editar</button></li>
                    <li><strong>Fecha de vencimiento:</strong> {data.fechaVencimiento || "-"} <button onClick={() => setStep(6)}>Editar</button></li>
                  </ul>
                  <div style={{ marginTop: 12 }}>
                    <button onClick={prevStep}>Volver</button>
                    <button onClick={handleFinalSubmit} style={{ marginLeft: 8 }}>Enviar</button>
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
