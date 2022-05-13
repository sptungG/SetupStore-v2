import { Row, Col, Rate } from "antd";
import React from "react";
import styled from "styled-components";
import ProDuctCard1 from "./ProductCard1";
const MyListProDuctCard1 = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 100%;
`;
const style = { background: "#0092ff", padding: "8px 0", margin: "auto" };
const ListProDuctCard1 = (props) => {
  const { data } = props;
  return (
    <>
      <Row>
        <Col span={8}>
          <ProDuctCard1></ProDuctCard1>
        </Col>
        <Col span={8}>
          <ProDuctCard1></ProDuctCard1>
        </Col>
        <Col span={8}>
          <ProDuctCard1></ProDuctCard1>
        </Col>
      </Row>
    </>
  );
};

export default ListProDuctCard1;
