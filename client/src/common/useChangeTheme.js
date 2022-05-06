import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "stores/theme/theme.reducer";
import darkVars from "config/theme.dark.json";
import lightVars from "config/theme.light.json";

export function useChangeTheme() {
  const themeValue = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (themeValue === "light") window.less.modifyVars(lightVars);
  //   else window.less.modifyVars(darkVars);
  // }, [themeValue])

  return {
    theme: themeValue,
    changeTheme: (value) => dispatch(setTheme(value)),
  };
}
