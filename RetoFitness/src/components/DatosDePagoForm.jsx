import { useForm } from "react-hook-form";
import { saveData } from "../utils/storage"; // Usamos saveData

const DatosPagoForm = ({ nextStep, prevStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    saveData("datosPago", data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "20px 0" }}>
      <h3>Datos de Pago</h3>

      <div style={{ margin: "10px 0" }}>
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
        {errors.numeroTarjeta && <p style={{ color: "red" }}>{errors.numeroTarjeta.message}</p>}
      </div>

      <div style={{ margin: "10px 0" }}>
        <label>Fecha de vencimiento</label>
        <input
          type="month"
          {...register("fechaVencimiento", {
            required: "La fecha de vencimiento es obligatoria",
          })}
        />
        {errors.fechaVencimiento && <p style={{ color: "red" }}>{errors.fechaVencimiento.message}</p>}
      </div>

      <button type="button" onClick={prevStep}>Anterior</button>
      <button type="submit">Siguiente</button>
    </form>
  );
};

export default DatosPagoForm;
