
import { useState, useEffect, useContext} from 'react'
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { Listado } from './Listado';
import { ArticulosContext } from '../../contexts/Articulos';

export const Articulos = () => {
const {articulos, cargando} = useContext(ArticulosContext)

 
  return (
    <>
      {cargando ? "Cargando..." :

        articulos.length >= 1 ? <Listado/> : <h1>There are no article</h1>
      }


    </>

  )
}
