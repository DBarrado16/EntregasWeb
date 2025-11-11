import { useForm } from "react-hook-form";

const CorreoForm = ({ nextStep, prevStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Correo Electrónico</h3>

      <div className="form-group">
        <label>Correo</label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          {...register("correo", { required: "El correo es obligatorio" })}
        />
        {errors.correo && <p className="error-message">{errors.correo.message}</p>}
      </div>

      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>Anterior</button>
        <button type="submit" className="btn btn-primary">Siguiente</button>
      </div>
    </form>
  );
};

export default CorreoForm;
