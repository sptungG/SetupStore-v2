import { Button, Dropdown } from "antd";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaMagic, FaSun } from "react-icons/fa";
import { useChangeThemeProvider } from "src/common/useChangeThemeProvider";
import styled from "styled-components";
import SketchColorPicker from "../picker/SketchColorPicker";

const DropdownWrapper = styled.div`
  margin-top: 8px;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 25%) 0px 1px 4px;
  padding: 8px;
  overflow: hidden;
  & .twitter-picker {
    box-shadow: none !important;
    margin: -15px -14px -9px -15px;
    & input{
      width: 62px !important;
    }
  }
  & .btn-theme{
    margin-top: 8px;
  }
`;

const ThemeButton = ({ type = "icon" }) => {
  const { themeProvider, changeThemeProvider } = useChangeThemeProvider();
  if (type === "icon")
    return (
      <Button
        className="btn-theme-icon"
        type="dashed"
        shape="circle"
        size="large"
        onClick={() =>
          changeThemeProvider({
            ...themeProvider,
            mode: themeProvider.mode === "light" ? "dark" : "light",
          })
        }
        style={{ color: themeProvider.primaryColor }}
      >
        {themeProvider.mode === "light" ? <FaSun size={26} /> : <BsFillMoonStarsFill size={24} />}
      </Button>
    );
  return (
    <Dropdown
      trigger={["click"]}
      overlay={
        <DropdownWrapper>
          <SketchColorPicker />
          <Button
            className="btn-theme"
            size="large"
            onClick={() =>
              changeThemeProvider({
                ...themeProvider,
                mode: themeProvider.mode === "light" ? "dark" : "light",
              })
            }
          >
            {themeProvider.mode}
          </Button>
        </DropdownWrapper>
      }
    >
      <Button type="dashed" shape="circle" size="large">
        <FaMagic size={24} />
      </Button>
    </Dropdown>
  );
};

export default ThemeButton;
