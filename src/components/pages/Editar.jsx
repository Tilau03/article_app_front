import React from "react";
import { useState } from "react";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";
import { UseForm } from "../../hooks/UseForm";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ArticulosContext } from "../../contexts/Articulos";

export const Editar = () => {
  const { formulario, enviado, cambiado } = UseForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({});
  const navigate = useNavigate();
  const { setArticulos, conseguirArticulos} = useContext(ArticulosContext);
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const { datos } = await Peticion(
      Global.url + "articulo/" + params.id,
      "GET"
    );

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
  };

  const editarArticulo = async (e) => {
    e.preventDefault();

    let nuevoArticulo = formulario;

    const { datos } = await Peticion(
      Global.url + "articulo/" + params.id,
      "PUT",
      nuevoArticulo
    );

    if (datos.status === "success") {
      setResultado("guardado");

      setArticulo(nuevoArticulo);

     conseguirArticulos();
      
      

      navigate("/articulos");

    } else {
      setResultado("error");
    }
    

    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput.files[0]) {
      setResultado("guardado");

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const subida = await Peticion(
        Global.url + "subir-imagen/" + datos.articulo._id,
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
      <h1>Edit Article</h1>
      <p>Form to EDIT: {articulo.titulo}</p>
      <strong>{resultado == "guardado" ? "Saved Article!" : ""}</strong>
      <strong>{resultado == "error" ? "Incorrect Data!" : ""}</strong>

      <form className="formulario" onSubmit={editarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Title</label>
          <input
            type="text"
            name="titulo"
            onChange={cambiado}
            defaultValue={articulo.titulo}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Content</label>
          <textarea
            type="text"
            name="contenido"
            onChange={cambiado}
            defaultValue={articulo.contenido}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Image</label>
          <div className="mascara">
            {articulo.imagen == "default.png" && (
              <img src="https://i.ibb.co/QQYWbMH/OIP.jpg"></img>
            )}
            {articulo.imagen != "default.png" && (
              <img src={Global.url + "imagen/" + articulo.imagen}></img>
            )}
          </div>
          <input type="file" name="file0" id="file" />
        </div>

        <input type="submit" value="Save" className="btn btn-success" />
      </form>
    </div>
  );
};
