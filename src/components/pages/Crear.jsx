import React from 'react';
import { useState } from 'react';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { UseForm } from '../../hooks/UseForm';

export const Crear = () => {

  const { formulario, enviado, cambiado } = UseForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async (e) => {
    e.preventDefault();


    let nuevoArticulo = formulario;

    const { datos } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);

    if (datos.status === "success" ) {
      setResultado("guardado");
    } else {
      setResultado("error");
    }

    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput.files[0]) {
      setResultado("guardado");

    
      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);

      const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);

      if (subida.datos.status === "success" ) {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
    }
  }


  return (
    <div className='jumbo'>
      <h1>Create Article</h1>
      <p>Form to create article</p>

      <strong>{resultado == "guardado" ? "Saved Article!" : ""}</strong>
      <strong>{resultado == "error" ? "Incorrect Data!" : ""}</strong>

      <form className='formulario' onSubmit={guardarArticulo}>


        <div className='form-group'>
          <label htmlFor='titulo'>Title</label>
          <input type="text" name="titulo" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Content</label>
          <textarea type="text" name="contenido" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Image</label>
          <input type="file" name="file0" id='file' />
        </div>

        <input type='submit' value="Save" className='btn btn-success' />


      </form>

    </div>
  )
}
