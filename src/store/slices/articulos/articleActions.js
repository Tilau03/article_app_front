import {} from "react-redux";
import { getAllArticlesAPI,addArticleAPI } from "./articleCRUD";
import { getAllArticles,addArticle } from "./articulosReducer";

export const showAllArticles = () => (dispatch) => {
  return getAllArticlesAPI().then((res) => {
    dispatch(getAllArticles(res.data.articulos));
  });
};

export const addNewArticle = (article) => (disptach)=>{
 return addArticleAPI(article).then((res)=>{
    const {data} = res
    disptach(addArticle(data.articulo))
})
}
