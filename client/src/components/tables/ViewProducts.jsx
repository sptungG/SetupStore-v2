import { Row, Space, Radio, Checkbox, Button, Col ,Input} from "antd";
import React from "react";
import styled from "styled-components";
import ListProDuctCard1 from "components/card/ListProductCard1";

const {Search} = Input
const MyViewProduct = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const ViewProduct = () => {
  return (
    <>
      <Row>
        View Product
      </Row>
      <MyViewProduct>
        <Row>
          <Search placeholder="input search text" style={{ width: '100%' }} />
        </Row>
        <Row>
          <ListProDuctCard1></ListProDuctCard1>
        </Row>
      </MyViewProduct>
    </>
  );
};

export default ViewProduct;
