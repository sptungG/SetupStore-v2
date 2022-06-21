import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth.reducer";
import themeReducer from "./theme/theme.reducer";
import headerReducer from "./header/header.reducer";

import { authApi } from "./auth/auth.query";
import { productsApi } from "./product/products.query";
import { categoriesApi } from "./category/categories.query";
import { combosApi } from "./combo/combos.query";

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
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      loadingBarMiddleware({
        promiseTypeSuffixes: ["pending", "fulfilled", "rejected"],
      }),
      authApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      combosApi.middleware,
    ]),
});

export const persistor = persistStore(store);
