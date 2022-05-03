import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "stores/theme/theme.reducer";
import darkVars from "config/theme.dark.json";
import lightVars from "config/theme.light.json";

export function useToggleTheme() {
  const themeValue = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (themeValue === "light") window.less.modifyVars(lightVars);
    else window.less.modifyVars(darkVars);
  }, [themeValue])

  return {
    theme: themeValue,
    toggleTheme: () => dispatch(setTheme(themeValue === "light" ? "dark" : "light")),
  };
}
