import { useTheme, createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "redux/mode/mode.reducer";

export const useToggleMode = () => {
  const theme = useTheme();
  const modeValue = useSelector((state: any) => state.mode.value);
  const dispatch = useDispatch();

  const currentTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: modeValue,
        },
      }),
    [modeValue]
  );

  return {
    theme: currentTheme,
    mode: modeValue,
    toggleMode: () => dispatch(setMode(theme.palette.mode === "light" ? "dark" : "light")),
  };
};
