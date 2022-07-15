import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
} from "src/stores/product/product.query";
import { setThemeProvider } from "src/stores/theme/theme.reducer";
import { useGetMyCartQuery } from "src/stores/user/user.query";

export function useAddToCart() {
  const [
    addProductToCart,
    { isLoading: addProductToCartLoading, isSuccess: addProductToCartSuccess },
  ] = useAddProductToCartMutation();
  const [
    removeProductFromCart,
    { isLoading: removeProductFromCartLoading, isSuccess: removeProductFromCartSuccess },
  ] = useRemoveProductFromCartMutation();
  const {
    data: myCartQuery,
    isSuccess: myCartQuerySuccess,
    refetch: myCartRefetch,
  } = useGetMyCartQuery();
  useEffect(() => {
    if (addProductToCartSuccess || removeProductFromCartSuccess) myCartRefetch();
  }, [addProductToCartSuccess, removeProductFromCartSuccess]);

  // console.log("useAddToCart ~ cart", cart);

  return {
    cart: myCartQuerySuccess ? myCartQuery.data : null,
    addProductToCart,
    removeProductFromCart,
    myCartRefetch,
  };
}
