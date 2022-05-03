import React from "react";
import { Button } from "antd";
import { useToggleTheme } from "common/useToggleTheme";

const ThemeButton = () => {
  const { theme, toggleTheme } = useToggleTheme();
  return (
    <div>
      <Button onClick={toggleTheme}>{theme}</Button>
    </div>
  );
};

export default ThemeButton;
