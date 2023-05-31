import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { Listado } from './Listado';

export const Busqueda = () => {

  const [Articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params=useParams();

  useEffect(() => {
    conseguirArticulos();
  }, [])

  const conseguirArticulos = async () => {

    const { datos, cargando } = await Peticion(Global.url + "buscar/"+params.busqueda, "GET");

    if (datos.status === "success") {
      setArticulos(datos.articulos)
    }else{
      setArticulos([]);
    }
    setCargando(false)
  }
  return (
    <>
      {cargando ? "Cargando..." :

        Articulos.length >= 1 ? <Listado/> : <h1>There are no articles</h1>
      }


    </>

  )
}
