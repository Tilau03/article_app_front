import {configureStore} from '@reduxjs/toolkit'
import articlesSlice from './slices/articulos/articulosReducer';

export const store = configureStore({
    reducer: { articles: articlesSlice },
    devTools:"ok"
  });