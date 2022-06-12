import React from "react";
import { Button as AntdButton } from "antd";

const Button = ({
  loading = false,
  disabled = false,
  type = "primary",
  block = false,
  children,
  onClick,
}) => {
  return (
    <AntdButton type={type} onClick={onClick} loading={loading} disabled={disabled} block={block}>
      {children}
    </AntdButton>
  );
};

export default Button;
