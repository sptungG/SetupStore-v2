import { Layout, Row, Col } from "antd";
import Header from "components/nav/Header";
import Footer from "components/nav/Footer";
import HomeMenu from "components/nav/Menu";
import React from "react";

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <>
      <Row>
        <Col span={collapsed ? 2 : 6}>
          <HomeMenu
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          ></HomeMenu>
        </Col>
        <Col span={collapsed ? 20 : 17} offset={collapsed ? 1 : 0}>
          <Row>
            <Header></Header>
          </Row>
          <Row>
            <Layout.Content>{children}</Layout.Content>
          </Row>
        </Col>
      </Row>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
