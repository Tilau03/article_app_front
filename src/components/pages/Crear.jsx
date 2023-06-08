import { useState } from "react";
//import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";

//import { useDispatch } from "react-redux"
//import {addNewArticle} from "../../store/slices/articulos/articleActions"
import axios from "axios";

export const Crear = () => {
  ///OLD
  //NEW
  const [formState, setFormState] = useState({
    titulo: "",
    contenido: "",
  });
  const [file, setFile] = useState(null);

  // const dispatch = useDispatch()

  const handleFileChange = ({ target }) => {
    setFile(target.files[0]);
  };

  const handleChange = ({ target }) => {
    setFormState((formState) => ({
      ...formState,
      [target.name]: target.value,
    }));
  };

  const guardarArticulo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append("file0", file);
    formData.append("data", JSON.stringify(formState));

    axios.post(Global.url + "crear", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    //const data = dispatch(addNewArticle(formState))

    //console.log(data)
    /* if (file) {
        const formData = new FormData();
        formData.append('file0',file);

        axios.post("")

        const subida = await Peticion(
        Global.url + "subir-imagen/" + data._id,
        "POST",
        formData,
        true
      );

      if (subida.datos.status === "success") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
    }  */
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
          <label htmlFor='titulo'>Title</label>
          <input
            type='text'
            required
            name='titulo'
            onChange={handleChange}
            value={formState.titulo}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Content</label>
          <textarea
            type='text'
            required
            name='contenido'
            onChange={handleChange}
            value={formState.contenido}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Image</label>
          <input
            type='file'
            required
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
