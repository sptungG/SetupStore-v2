import React from "react";
import { Button } from "antd";
import { useChangeTheme } from "common/useChangeTheme";

const ThemeButton = () => {
  const { theme, changeTheme } = useChangeTheme();
  return (
    <Button className="btn-theme" onClick={() => changeTheme(theme === "light" ? "dark" : "light")}>
      {theme}
    </Button>
  );
};

export default ThemeButton;
