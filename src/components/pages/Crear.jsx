import { useState, useContext } from "react";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";
import { UseForm } from "../../hooks/UseForm";

import { ArticulosContext } from "../../contexts/Articulos";
import { useDispatch } from "react-redux"
import {addNewArticle} from "../../store/slices/articulos/articleActions"

export const Crear = () => {
  ///OLD
  const { formulario, enviado, cambiado } = UseForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const { articulos, setArticulos } = useContext(ArticulosContext);
  //NEW
  const [formState, setFormState] = useState({
  titulo:"",
  contenido:"",
  file0:""
  });
  const [file, setFile] = useState(null)

  const dispatch = useDispatch()

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

   const data = dispatch(addNewArticle(formState))
   
    const fileInput = document.querySelector("#file");

    if (file) {
        const formData = new FormData();
        formData.append('file0',file);

        const subida = await Peticion(
        Global.url + "subir-imagen/" + formState.titulo,
        "POST",
        formData,
        true
      );

      if (subida.datos.status === "success") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
    } 
  };

  return (
    <div className="jumbo">
      <h1>Create Article</h1>
      <p>Form to create article</p>

      <strong>{resultado == "guardado" ? "Saved Article!" : ""}</strong>
      <strong>{resultado == "error" ? "Incorrect Data!" : ""}</strong>

      <form className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Title</label>
          <input type="text" required name="titulo" onChange={handleChange} value={formState.titulo}/>
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Content</label>
          <textarea type="text" required name="contenido" onChange={handleChange} value={formState.contenido}/>
        </div>

        <div className="form-group">
          <label htmlFor="file0">Image</label>
          <input type="file" required name="file0" id="file" onChange={handleFileChange} />
        </div>

        <input type="submit" value="Save" className="btn btn-success" />
      </form>
    </div>
  );
};
