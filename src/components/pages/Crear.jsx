import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewArticle } from "../../store/slices/articulos/articleActions";

export const Crear = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    titulo: "",
    contenido: "",
  });
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  const handleFileChange = ({ target }) => {
    setFile(target.files[0]);
  };

  const handleChange = ({ target }) => {
    setFormState((formState) => ({
      ...formState,
      [target.name]: target.value,
    }));
  };

  const validatorForm = (objeto) => {
    const error = {};

    !objeto.titulo && (error.titulo = "falta el campo titulo");
    !objeto.contenido && (error.contenido = "falta el campo contenido");

    return error;
  };

  const guardarArticulo = async (e) => {
    e.preventDefault();

    setErrors(validatorForm(formState));
    if (!Object.keys(errors)) {
      const formData = new FormData();

      formData.append("file0", file);
      formData.append("data", JSON.stringify(formState));

      dispatch(addNewArticle(formState));
    }
  };

  return (
    <div className='jumbo'>
      <h1>Create Article</h1>
      <p>Form to create article</p>

      {/* <strong>{resultado == "guardado" ? "Saved Article!" : ""}</strong>
      <strong>{resultado == "error" ? "Incorrect Data!" : ""}</strong>
 */}
      <form className='formulario' onSubmit={guardarArticulo}>
        <div className='form-group'>
          <label htmlFor='titulo'>Title: <span style={{color:"red", fontSize:10}}>{errors.titulo}</span></label>
          <input
            type='text'
            name='titulo'
            onChange={handleChange}
            value={formState.titulo}
          />
          
        </div>

        <div className='form-group'>
        <label htmlFor='titulo'>Contenido: <span style={{color:"red", fontSize:10}}>{errors.contenido}</span></label>
          <textarea
            type='text'
            name='contenido'
            onChange={handleChange}
            value={formState.contenido}
            placeholder="Contenido"
          />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Image</label>
          <input
            type='file'
            name='file0'
            id='file'
            onChange={handleFileChange}
          />
        </div>

        <input type='submit' value='Save' className='btn btn-success' />
      </form>
    </div>
  );
};
