import { useForm } from "react-hook-form";

const DireccionForm = ({ nextStep, prevStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Dirección</h3>

      <div className="form-group">
        <label>Calle y número</label>
        <input
          type="text"
          placeholder="Calle Ficticia 123"
          {...register("direccion", { required: "La dirección es obligatoria" })}
        />
        {errors.direccion && <p className="error-message">{errors.direccion.message}</p>}
      </div>

      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>Anterior</button>
        <button type="submit" className="btn btn-primary">Siguiente</button>
      </div>
    </form>
  );
};

export default DireccionForm;
