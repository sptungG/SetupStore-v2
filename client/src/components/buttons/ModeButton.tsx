import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useToggleMode } from "common/useToggleMode";

const ModeButton = () => {
  const { mode, toggleMode } = useToggleMode();
  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ModeButton;
