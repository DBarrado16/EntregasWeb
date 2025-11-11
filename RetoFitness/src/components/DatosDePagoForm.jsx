import { useForm } from "react-hook-form";
import { saveData } from "../utils/storage";

const DatosPagoForm = ({ nextStep, prevStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    saveData("datosPago", data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Datos de Pago</h3>

      <div className="form-group">
        <label>Número de tarjeta</label>
        <input
          type="text"
          placeholder="1234 5678 9101 1121"
          {...register("numeroTarjeta", {
            required: "El número de tarjeta es obligatorio",
            pattern: {
              value: /^[0-9]{16}$/,
              message: "El número de tarjeta debe ser de 16 dígitos",
            }
          })}
        />
        {errors.numeroTarjeta && <p className="error-message">{errors.numeroTarjeta.message}</p>}
      </div>

      <div className="form-group">
        <label>Fecha de vencimiento</label>
        <input
          type="month"
          {...register("fechaVencimiento", {
            required: "La fecha de vencimiento es obligatoria",
          })}
        />
        {errors.fechaVencimiento && <p className="error-message">{errors.fechaVencimiento.message}</p>}
      </div>

      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>Anterior</button>
        <button type="submit" className="btn btn-primary">Siguiente</button>
      </div>
    </form>
  );
};

export default DatosPagoForm;
