import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { Link } from 'react-router-dom';
import { ArticulosContext } from '../../contexts/Articulos';



export const Articulo = () => {

  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();
  const {eliminar} = useContext(ArticulosContext);


  useEffect(() => {
    conseguirArticulo();
  }, [])

  const conseguirArticulo = async () => {
    const { datos, cargando } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo)
    }
    setCargando(false)
  }


  return (
    <div className='jumbo'>
      {cargando ? "Cargando..." :
        <>
          <div className='mascara'>
            {articulo.imagen == "default.png" && <img src='https://i.ibb.co/QQYWbMH/OIP.jpg'></img>}
            {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen}></img>}
          </div>

          <h1>{articulo.titulo}</h1>
          <span>Date: {articulo.fecha}</span>
          <p>{articulo.contenido}</p>

          <Link to={"/Editar/" + articulo._id} className="edit">Edit</Link>
          <button className="delete" onClick={() => eliminar(articulo._id)}>Delete</button>


        </>
      }

    </div>
  );
}