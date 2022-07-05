import { combineReducers, configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
// import { loadingBarMiddleware } from "react-redux-loading-bar";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth.reducer";
import userReducer from "./user/user.reducer";
import themeReducer from "./theme/theme.reducer";
import headerReducer from "./header/header.reducer";

import { addressApi } from "./address/address.query";
import { authApi } from "./auth/auth.query";
import { cartApi } from "./cart/cart.query";
import { categoryApi } from "./category/category.query";
import { comboApi } from "./combo/combo.query";
import { contentApi } from "./content/content.query";
import { imageApi } from "./image/image.query";
import { orderApi } from "./order/order.query";
import { productApi } from "./product/product.query";
import { reviewApi } from "./review/review.query";
import { statisticApi } from "./statistic/statistic.query";
import { userApi } from "./user/user.query";
import { variantApi } from "./variant/variant.query";
import { wishlistApi } from "./wishlist/wishlist.query";
import { galleryApi } from "./unsplash/gallery.query";
// import { notification } from "antd";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "themeProvider", "user"],
};

const reducers = combineReducers({
  auth: authReducer,
  themeProvider: themeReducer,
  headerState: headerReducer,
  user: userReducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [comboApi.reducerPath]: comboApi.reducer,
  [contentApi.reducerPath]: contentApi.reducer,
  [imageApi.reducerPath]: imageApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [statisticApi.reducerPath]: statisticApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [variantApi.reducerPath]: variantApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [galleryApi.reducerPath]: galleryApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn(action.payload);
    // notification.warning({ message: action.payload.status, description: action.payload.data.err });
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
      addressApi.middleware,
      authApi.middleware,
      cartApi.middleware,
      categoryApi.middleware,
      comboApi.middleware,
      contentApi.middleware,
      imageApi.middleware,
      orderApi.middleware,
      productApi.middleware,
      reviewApi.middleware,
      statisticApi.middleware,
      userApi.middleware,
      variantApi.middleware,
      wishlistApi.middleware,
      galleryApi.middleware,
    ]),
});

export const persistor = persistStore(store);
