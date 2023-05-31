import React from 'react'
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { ArticulosContext } from '../../contexts/Articulos';
import { useContext } from 'react';

export const Listado = () => {
  const {articulos, setArticulos} = useContext(ArticulosContext)

  const eliminar = async (id) => {
    let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");

    if (datos.status === "success") {
      let articulosActualizados = Articulos.filter(articulo => articulo._id !== id);
      setArticulos(articulosActualizados);
    }
  }

  return (
    articulos.map(articulo => {
      return (
        <article key={articulo._id} className="articulo-item">

          <div className='mascara'>
            {articulo.imagen == "default.png" && <img src='https://i.ibb.co/QQYWbMH/OIP.jpg'></img>}
            {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen}></img>}
          </div>

          <div className='datos'>
            <h3 className="title"><Link to={"/articulo/" + articulo._id}>{articulo.titulo}</Link></h3>
            <p className="description">{articulo.contenido}</p>

            <Link to={"/Editar/" + articulo._id} className="edit">Edit</Link>
            <button className="delete" onClick={() => eliminar(articulo._id)}>Delete</button>

          </div>
        </article>
      );
    })
  )
}