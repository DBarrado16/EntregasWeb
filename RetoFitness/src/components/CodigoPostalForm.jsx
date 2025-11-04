import { useForm } from "react-hook-form";

const CodigoPostalForm = ({ nextStep, prevStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    nextStep();  // Avanzamos al siguiente paso
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "20px 0" }}>
      <h3>Código Postal</h3>

      <div style={{ margin: "10px 0" }}>
        <label>Código postal</label>
        <input
          type="text"
          placeholder="28001"
          {...register("codigoPostal", { required: "El código postal es obligatorio" })}
        />
        {errors.codigoPostal && <p style={{ color: "red" }}>{errors.codigoPostal.message}</p>}
      </div>

      <button type="button" onClick={prevStep}>Anterior</button>
      <button type="submit">Siguiente</button>
    </form>
  );
};

export default CodigoPostalForm;
