import { Col, Row } from "antd";
import { useUserStorage } from "common/useUserStorage";
import MainLayout from "pages/MainLayout";
import MainSideLayout from "pages/MainSideLayout";
import React from "react";

const HomePage = () => {
  const { credential, setCredential } = useUserStorage();
  const isSignedIn = credential.user == null;
  return (
    <MainLayout>
      <Row>
        <Col span={6}></Col>
        <Col span={18}></Col>
      </Row>
    </MainLayout>
  );
};

export default HomePage;
