import { useForm } from "react-hook-form";

const CorreoForm = ({ nextStep, prevStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    nextStep();  // Avanzamos al siguiente paso
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "20px 0" }}>
      <h3>Correo Electrónico</h3>

      <div style={{ margin: "10px 0" }}>
        <label>Correo</label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          {...register("correo", { required: "El correo es obligatorio" })}
        />
        {errors.correo && <p style={{ color: "red" }}>{errors.correo.message}</p>}
      </div>

      <button type="button" onClick={prevStep}>Anterior</button>
      <button type="submit">Siguiente</button>
    </form>
  );
};

export default CorreoForm;
