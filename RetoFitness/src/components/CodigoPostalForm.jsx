import { useForm } from "react-hook-form";

const CodigoPostalForm = ({ nextStep, prevStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    nextStep(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Código Postal</h3>

      <div className="form-group">
        <label>Código postal</label>
        <input
          type="text"
          placeholder="28001"
          {...register("codigoPostal", { required: "El código postal es obligatorio" })}
        />
        {errors.codigoPostal && <p className="error-message">{errors.codigoPostal.message}</p>}
      </div>

      <div className="button-group">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>Anterior</button>
        <button type="submit" className="btn btn-primary">Siguiente</button>
      </div>
    </form>
  );
};

export default CodigoPostalForm;
