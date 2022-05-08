import React from "react";
import { Button } from "antd";
import { useChangeTheme } from "common/useChangeTheme";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";

const ThemeButton = () => {
  const { theme, changeTheme } = useChangeTheme();
  return (
    <Button
      className="btn-theme"
      type="dashed"
      shape="circle"
      size="large"
      onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
      style={{color: "#d3adf7"}}
    >
      {theme === "light" ? <FaSun size={26}/> : <BsFillMoonStarsFill size={24}/>}
    </Button>
  );
};

export default ThemeButton;
