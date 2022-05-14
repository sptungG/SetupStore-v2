import { Col, Row } from "antd";
import { useChangeCollapsed } from "common/useChangeCollapsed";
import DropdownMenu from "components/nav/DropdownMenu";
import SideBarNav from "components/nav/SideBarNav";
import Footer from "components/nav/Footer";
import Header from "components/nav/Header";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  flex-wrap: nowrap;
  background-color: #eee;
  column-gap: 16px;
  .wrap-sider {
    flex: ${(props) => (props.collapsed ? "0 0 auto" : "0 0 230px")};
    background-color: #fff;
  }
  .wrap-main {
    flex: 1 1 auto;
    border-radius: 24px 0 0 24px;
    padding: 12px;
    background-color: #fff;

  }
`;

const MainLayout = ({ children }) => {
  const { collapsed } = useChangeCollapsed();
  return (
    <Wrapper collapsed={collapsed}>
      <div className="wrap-sider">
        <SideBarNav />
      </div>
      <div className="wrap-main">
        <Row>
          <Col span={24}>
            <Header />
          </Col>
          <Col span={24}>{children}</Col>
        </Row>
      </div>
    </Wrapper>
  );
};

export default MainLayout;
