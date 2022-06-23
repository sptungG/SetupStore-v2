import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeProvider } from "src/stores/theme/theme.reducer";

export function useAddToCart() {
  const [cart, setCart] = useState([]);
  // console.log("useAddToCart ~ cart", cart);

  return {
    cart: cart,
    setCart: (product) => setCart([...cart, product]),
  };
}
