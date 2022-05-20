import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Space, Typography } from "antd";
import ThemeButton from "components/buttons/ThemeButton";
import CollapsedButton from "components/buttons/CollapsedButton";
import AutocompleteSearch from "components/input/AutocompleteSearch";
import React from "react";
import styled from "styled-components";
import LogoAndText from "./LogoAndText";
import { Link } from "react-router-dom";
import { useUserStorage } from "common/useUserStorage";
import ProfileDropdownMenu from "./ProfileDropdown";

const HeaderWrapper = styled.header`
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 24px;
  .header-left {
  }
  .header-center {
    margin: 0 auto;
  }
  .header-right {
  }
`;

const Header = () => {
  const { credential, setCredential } = useUserStorage();
  const isSignedIn = credential.user != null && credential.authtoken != null;
  return (
    <HeaderWrapper>
      <div className="header-left">
        <LogoAndText fontSize={24} />
        <Space align="center">
          <Typography.Text strong>Danh mục</Typography.Text>
          <CollapsedButton />
        </Space>
      </div>
      <div className="header-center"></div>
      <div className="header-right">
        <Space>
          <Badge dot>
            <ShoppingCartOutlined style={{ fontSize: "24px" }} />
          </Badge>
          <Badge dot>
            <BellOutlined style={{ fontSize: "24px" }} />
          </Badge>
          {isSignedIn ? (
            <ProfileDropdownMenu />
          ) : (
            <Space>
              <Button type="link" shape="round" size="large">
                <Link to="/login">Login</Link>
              </Button>
              <Button type="primary" shape="round" size="large">
                <Link to="/register">Register</Link>
              </Button>
            </Space>
          )}
        </Space>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
