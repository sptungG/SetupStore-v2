import { combineReducers, configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
// import { loadingBarMiddleware } from "react-redux-loading-bar";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth.reducer";
import themeReducer from "./theme/theme.reducer";
import headerReducer from "./header/header.reducer";

import { authApi } from "./auth/auth.query";
import { productsApi } from "./product/products.query";
import { categoriesApi } from "./category/categories.query";
import { combosApi } from "./combo/combos.query";
import { galleryApi } from "./unsplash/gallery.query";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const reducers = combineReducers({
  auth: authReducer,
  themeProvider: themeReducer,
  headerState: headerReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [combosApi.reducerPath]: combosApi.reducer,
  [galleryApi.reducerPath]: galleryApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn(action.payload);
  }

  return next(action);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      rtkQueryErrorLogger,
      // loadingBarMiddleware({
      //   promiseTypeSuffixes: ["pending", "fulfilled", "rejected"],
      // }),
      authApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      combosApi.middleware,
      galleryApi.middleware,
    ]),
});

export const persistor = persistStore(store);
