import React, { useLayoutEffect } from "react";
import { useAddToCart } from "src/common/useAddToCart";

const UserCartPage = () => {
  const { cart, myCartRefetch } = useAddToCart();
  useLayoutEffect(() => {
    myCartRefetch();
  }, []);
  return <div>UserCartPage {JSON.stringify(cart)}</div>;
};

export default UserCartPage;
