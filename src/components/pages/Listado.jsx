import React from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { ArticulosContext } from "../../contexts/Articulos";
import { useContext } from "react";
import { useState, useEffect } from "react";

export const Listado = (props) => {
  const { articles } = props;
   return (
    <>
      {articles && articles.length > 0 &&
        articles.map(({ imagen, _id, contenido, titulo }) => (
          <article key={_id} className="articulo-item">
            <div className="mascara">
              {imagen == "default.png" && (
                <img
                  src="https://i.ibb.co/QQYWbMH/OIP.jpg"
                  alt="default image"
                ></img>
              )}
              {imagen != "default.png" && (
                <img
                  src={Global.url + "/imagen/" + imagen}
                  alt="loaded image"
                ></img>
              )}
            </div>
            <div className="datos">
              <h3 className="title">
                <Link to={"/articulo/" + _id}>{titulo}</Link>
              </h3>
              <p className="description">{contenido}</p>
            </div>
          </article>
        ))}
    </>
  );
};
