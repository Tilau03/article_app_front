import { useState, createContext, useEffect } from "react";
import { Global } from "../helpers/Global";
import { Peticion } from "../helpers/Peticion";

export const ArticulosContext = createContext({})

export const ArticulosProvider= ({children}) => {
    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);
  
    useEffect(() => {
      conseguirArticulos();
    }, [])
  
    const conseguirArticulos = async () => {
  
      const { datos, cargando } = await Peticion(Global.url + "articulos", "GET");
  
      if (datos.status === "success") {
        setArticulos(datos.articulos)
      }
      setCargando(false)
    }
  return (
    <ArticulosContext.Provider value={{articulos, cargando, setArticulos}}>
       {children}
    </ArticulosContext.Provider>
  )
}



