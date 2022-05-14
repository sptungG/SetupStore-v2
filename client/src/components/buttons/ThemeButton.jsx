import React from "react";
import { Button } from "antd";
import { useChangeTheme } from "common/useChangeTheme";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";

const ThemeButton = ({ type = "icon" }) => {
  const { theme, changeTheme } = useChangeTheme();
  if (type === "icon")
    return (
      <Button
        className="btn-theme-icon"
        type="dashed"
        shape="circle"
        size="large"
        onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
        style={{ color: "#d3adf7" }}
      >
        {theme === "light" ? <FaSun size={26} /> : <BsFillMoonStarsFill size={24} />}
      </Button>
    );
  return (
    <Button className="btn-theme" size="large" onClick={() => changeTheme(theme === "light" ? "dark" : "light")}>
      {theme}
    </Button>
  );
};

export default ThemeButton;
