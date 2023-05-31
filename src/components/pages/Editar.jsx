import React from 'react';
import { useState } from 'react';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { UseForm } from '../../hooks/UseForm';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Editar = () => {

  const { formulario, enviado, cambiado } = UseForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [Articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, [])

  const conseguirArticulo = async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
  }


  const editarArticulo = async (e) => {
    e.preventDefault();


    let nuevoArticulo = formulario;

    const { datos } = await Peticion(Global.url + "articulo/"+ params.id, "PUT", nuevoArticulo);

    if (datos.status === "success") {
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

      if (subida.datos.status === "success") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
    }
  }


  return (
    <div className='jumbo'>
      <h1>Edit Article</h1>
      <p>Form to EDIT: {Articulo.titulo}</p>
      <strong>{resultado == "guardado" ? "Saved Article!" : ""}</strong>
      <strong>{resultado == "error" ? "Incorrect Data!" : ""}</strong>

      <form className='formulario' onSubmit={editarArticulo}>


        <div className='form-group'>
          <label htmlFor='titulo'>Title</label>
          <input type="text" name="titulo" onChange={cambiado} defaultValue={Articulo.titulo} />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Content</label>
          <textarea type="text" name="contenido" onChange={cambiado} defaultValue={Articulo.contenido} />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Image</label>
          <div className='mascara'>
            {Articulo.imagen == "default.png" && <img src='https://i.ibb.co/QQYWbMH/OIP.jpg'></img>}
            {Articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + Articulo.imagen}></img>}
          </div>
          <input type="file" name="file0" id='file' />
        </div>

        <input type='submit' value="Save" className='btn btn-success' />


      </form>

    </div>
  )
}

