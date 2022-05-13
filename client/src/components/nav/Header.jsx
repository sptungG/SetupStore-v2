import React from "react";
import { Row, Col, Avatar, Badge } from "antd";
import ThemeButton from "components/buttons/ThemeButton";
import AutocompleteSearch from "components/input/AutocompleteSearch";
import styled from "styled-components"
import {
  SearchOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

const MyHeader = styled.div`
  margin-top: 1rem;
  height: 100%;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .ant-col .ant-col-4{
    text-align: center;
    margin: auto;
  }
`

const Header = () => {
  return (
    <MyHeader>
      <Row justify="space-between" align="middle">
        <Col span={8} offset={16}>
          <Row>
            <Col span={4}>
              <ThemeButton></ThemeButton>
            </Col>
            <Col span={4}>
              <Badge dot>
                <SearchOutlined style={{ fontSize: "24px" }} />
              </Badge>
            </Col>
            <Col span={4}>
              <Badge dot>
                <ShoppingCartOutlined style={{ fontSize: "24px" }} />
              </Badge>
            </Col>
            <Col span={4}>
              <Badge dot>
                <BellOutlined style={{ fontSize: "24px" }} />
              </Badge>
            </Col>
            <Col span={4}>
              <p style={{'marginBottom': '0','fontSize': '14px','textAlign': 'right'}}>Name</p>
              <p style={{'fontSize': '12px','textAlign': 'right'}}>Type</p>
            </Col>
            <Col span={4}>
              <Badge dot>
                <Avatar size={36} icon={<UserOutlined />} />
              </Badge>
            </Col>
          </Row>
        </Col>
      </Row>
    </MyHeader>
  );
};

export default Header;
