import { Global } from "../../../helpers/Global";
import axios from "axios";

export const getAllArticlesAPI = async () => {
  return await axios.get(Global.url + "articulos");
};

export const addArticleAPI = async (article) => {
  return await axios.post(Global.url + "crear", article, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
