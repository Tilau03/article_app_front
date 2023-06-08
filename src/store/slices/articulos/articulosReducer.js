import { createSlice } from "@reduxjs/toolkit";

const articleInitialState = {
  articleList: [],
  loadingState: false,
};

export const articlesSlice = createSlice({
  name: "article",
  initialState: articleInitialState,
  reducers: {
    getAllArticles: (state, action) => {
      state.articleList = action.payload;
    },
    addArticle:(state, action) => {
      state.articleList.push(action.payload)
    }
  },
});

export const { getAllArticles,addArticle } = articlesSlice.actions;


export default articlesSlice.reducer
