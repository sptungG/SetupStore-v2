import React from "react";
import { Button as AntdButton } from "antd";
import styled from "styled-components";

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
  onClick = () => null,
}) => {
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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
        gap: 4,
      }}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
