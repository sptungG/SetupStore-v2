import React from "react";
import { Layout, Row, Col } from "antd";
import LogoAndText from "./LogoAndText";
import ThemeButton from "components/buttons/ThemeButton";
import AutocompleteSearch from "components/input/AutocompleteSearch";

const Header = () => {
  return (
    <header>
      <Row justify="space-between" align="middle">
        <Col span={7}>
        <LogoAndText logoSize={48} fontSize={28} fontWeight={500}/>
        </Col>
        <Col span={10}></Col>
        <Col span={4}>
          <Row align="middle" justify="end"></Row>
        </Col>
        <Col span={3}>
          <AutocompleteSearch />
          <ThemeButton />
        </Col>
      </Row>
    </header>
  );
};

export default Header;
