import { useState, createContext, useEffect } from "react";
import { Global } from "../helpers/Global";
import { Peticion } from "../helpers/Peticion";
import { useNavigate } from "react-router-dom";

export const ArticulosContext = createContext({});

export const ArticulosProvider = ({ children }) => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    const { datos, cargando } = await Peticion(Global.url + "articulos", "GET");

    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }
    setCargando(false);
  };
  const eliminar = async (id) => {
    let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");

    if (datos.status === "success") {
      let articulosActualizados = articulos.filter(
        (articulo) => articulo._id !== id
      );
      setArticulos(articulosActualizados);
      navigate("/articulos");
    }
  };
  return (
    <ArticulosContext.Provider
      value={{ articulos, cargando, setArticulos, eliminar }}
    >
      {children}
    </ArticulosContext.Provider>
  );
};
