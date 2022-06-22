import React from "react";
import { Button as AntdButton } from "antd";
import styled from "styled-components";
import { useChangeThemeProvider } from "src/common/useChangeThemeProvider";

const BtnContent = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
`;

const Button = ({
  icon = null,
  loading = false,
  disabled = false,
  type = "default",
  block = false,
  children,
  shape = "default",
  className = "",
  htmlType = "button",
  ghost = false,
  size = "middle",
  extraType = "",
  onClick = () => null,
  ...rest
}) => {
  const { themeProvider } = useChangeThemeProvider();

  let style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    gap: 4,
  };

  if (extraType === "btntag" && type === "link") {
    style.backgroundColor = themeProvider.generatedColors[0];
  }

  return (
    <AntdButton
      className={className}
      type={type}
      shape={shape}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      block={block}
      htmlType={htmlType}
      icon={icon}
      ghost={ghost}
      size={size}
      style={style}
      {...rest}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
