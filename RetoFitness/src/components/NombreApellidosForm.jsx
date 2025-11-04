import { useForm } from "react-hook-form";

const NombreApellidosForm = ({ nextStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    nextStep();  // Avanzamos al siguiente paso
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "20px 0" }}>
      <h3>Datos personales</h3>

      <div style={{ margin: "10px 0" }}>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Juan"
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {errors.nombre && <p style={{ color: "red" }}>{errors.nombre.message}</p>}
      </div>

      <div style={{ margin: "10px 0" }}>
        <label>Apellidos</label>
        <input
          type="text"
          placeholder="Pérez"
          {...register("apellidos", { required: "Los apellidos son obligatorios" })}
        />
        {errors.apellidos && <p style={{ color: "red" }}>{errors.apellidos.message}</p>}
      </div>

      <button type="submit">Siguiente</button>
    </form>
  );
};

export default NombreApellidosForm;
