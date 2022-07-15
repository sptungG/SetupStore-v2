import { Space, Typography } from "antd";
import React from "react";
import styled from "styled-components";
const ChipWrapper = styled.div`
  & .content {
    font-size: ${(props) => props.fontSize};
  }
  & .ant-space-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const ChipTag = ({ fontSize = 16, size = 2, split = "·", icon, children }) => {
  return (
    <ChipWrapper fontSize={fontSize}>
      <Space size={size} split={split} align="center">
        {icon}
        <span className="content">{children}</span>
      </Space>
    </ChipWrapper>
  );
};

export default ChipTag;
