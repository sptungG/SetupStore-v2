import MainLayout from "pages/MainLayout";
import React from "react";
import { Row, Col } from "antd";
import Filter from "components/tables/Filter"
import ViewProducts from "components/tables/ViewProducts"
const HomePage = () => {
  return (
    <MainLayout>
      <Row>
        <Col span={6}>
          <Filter></Filter>
        </Col>
        <Col span={18}>
          <ViewProducts></ViewProducts>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default HomePage;
