import { Row, Col, Rate ,Button} from "antd";
import React from "react";
import styled from "styled-components";

const MyProDuctCard1 = styled.div`
  width: 100%;
  .ant-rate {
    font-size: 12px;
  }
  .ant-row:first-child {
    justify-content: center;
    margin-top: 1rem;
  }
`;

const ProDuctCard1 = (props) => {
  const { data } = props;
  return (
    <MyProDuctCard1>
      <Row>
        <img
          style={{ width: "70%" }}
          src="https://png.pngtree.com/png-clipart/20190117/ourlarge/pngtree-red-alarm-clock-beautiful-alarm-clock-hand-drawn-alarm-clock-cute-png-image_412612.jpg"
        ></img>
      </Row>
      <Row>
        <Col span={12}>
          <Rate allowHalf defaultValue={2.5} />
        </Col>
        <Col span={12}>100.000</Col>
      </Row>
      <Row>
        <p>Product Name</p>
      </Row>
      <Row>
        <div style={{'textOverflow': 'ellipsis','height':"24px",'overflow': 'hidden' ,"width":"90%" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet tempore
          rem voluptatum cupiditate, mollitia tempora in sit aliquid eveniet
          distinctio expedita sequi iusto neque rerum ab consequuntur harum et
          enim.
        </div>
      </Row>
      <Row>
        <Col span={12}><Button>WishList</Button></Col>
        <Col span={12}><Button>Add to Cart</Button></Col>
      </Row>
    </MyProDuctCard1>
  );
};

export default ProDuctCard1;
