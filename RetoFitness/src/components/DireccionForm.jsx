import { useForm } from "react-hook-form";

const DireccionForm = ({ nextStep, prevStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    nextStep();  // Avanzamos al siguiente paso
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "20px 0" }}>
      <h3>Dirección</h3>

      <div style={{ margin: "10px 0" }}>
        <label>Calle y número</label>
        <input
          type="text"
          placeholder="Calle Ficticia 123"
          {...register("direccion", { required: "La dirección es obligatoria" })}
        />
        {errors.direccion && <p style={{ color: "red" }}>{errors.direccion.message}</p>}
      </div>

      <button type="button" onClick={prevStep}>Anterior</button>
      <button type="submit">Siguiente</button>
    </form>
  );
};

export default DireccionForm;
