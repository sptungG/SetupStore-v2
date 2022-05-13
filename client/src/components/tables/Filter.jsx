import { Row, Space, Radio, Checkbox, Button, Col } from "antd";
import React from "react";
import styled from "styled-components";

const MyFilter = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 90%;
`;

const Filter = () => {
  return (
    <>
      <Row>Filter</Row>
      <MyFilter>
        <Row>Price Range</Row>
        <Row>
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={1}>Option A</Radio>
              <Radio value={2}>Option B</Radio>
              <Radio value={3}>Option C</Radio>
            </Space>
          </Radio.Group>
        </Row>
        <Row>Categories</Row>
        <Row>
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={1}>Option A</Radio>
              <Radio value={2}>Option B</Radio>
              <Radio value={3}>Option C</Radio>
            </Space>
          </Radio.Group>
        </Row>
        <Row>Brand</Row>
        <Row>
          <Checkbox.Group style={{ width: "100%" }}>
            <Row>
              <Checkbox value="A">A</Checkbox>
            </Row>
            <Row>
              <Checkbox value="B">B</Checkbox>
            </Row>
            <Row>
              <Checkbox value="C">C</Checkbox>
            </Row>
            <Row>
              <Checkbox value="D">D</Checkbox>
            </Row>
            <Row>
              <Checkbox value="E">E</Checkbox>
            </Row>
            <Row>
              <Checkbox value="F">F</Checkbox>
            </Row>
          </Checkbox.Group>
        </Row>
        <Row>
          <Col span={12}>
            <Button>Clear Filter</Button>
          </Col>
          <Col span={12}>
            <Button>Filter</Button>
          </Col>
        </Row>
      </MyFilter>
    </>
  );
};

export default Filter;
