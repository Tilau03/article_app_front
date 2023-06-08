import { useState, useEffect, useContext } from "react";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";
import { Listado } from "./Listado";
import { ArticulosContext } from "../../contexts/Articulos";
import { showAllArticles } from "../../store/slices/articulos/articleActions";
import { useDispatch, useSelector } from "react-redux";

export const Articulos = () => {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.articles.articleList);

  useEffect(() => {
    dispatch(showAllArticles());
  }, []);

  return (
    <>
        <Listado articles={articles} />
    </>
  );
};
