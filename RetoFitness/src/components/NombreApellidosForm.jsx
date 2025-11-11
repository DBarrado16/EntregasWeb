import { useForm } from "react-hook-form";

const NombreApellidosForm = ({ nextStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    nextStep(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Datos personales</h3>

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Juan"
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
      </div>

      <div className="form-group">
        <label>Apellidos</label>
        <input
          type="text"
          placeholder="Pérez"
          {...register("apellidos", { required: "Los apellidos son obligatorios" })}
        />
        {errors.apellidos && <p className="error-message">{errors.apellidos.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary">Siguiente</button>
    </form>
  );
};

export default NombreApellidosForm;
