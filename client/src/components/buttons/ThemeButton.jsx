import React from "react";
import { Button } from "antd";
import { useToggleTheme } from "common/useToggleTheme";

const ThemeButton = () => {
  const { theme, toggleTheme } = useToggleTheme();
  return (
    <Button className="btn-theme" onClick={toggleTheme}>{theme}</Button>
  );
};

export default ThemeButton;
