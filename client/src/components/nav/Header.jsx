import { Avatar, Badge, Divider, Space, Typography } from "antd";
import CollapsedButton from "src/components/button/CollapsedButton";
import AutocompleteSearch from "src/components/input/AutocompleteSearch";
import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import LogoAndText from "./LogoAndText";
import { Link } from "react-router-dom";
import ProfileDropdownMenu from "./ProfileDropdown";
import Button from "../button/Button";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import ThemeButton from "../button/ThemeButton";
import { useContainerDimensions } from "src/common/useContainerDimensions";
import { useRef } from "react";
import { useMediaQuery } from "src/common/useMediaQuery";

const HeaderWrapper = styled.header`
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 24px;
  gap: 24px;
  flex-wrap: nowrap;
  .header-left {
  }
  .header-center {
    max-width: 480px;
    margin: 0 auto;
    flex: 1 0 auto;
  }
  .header-right {

  }
`;

const Header = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const credential = useSelector((state) => state.auth);
  const isSignedIn =
    credential.user != null && credential.authtoken != null && credential.refreshToken != null;
  const headerState = useSelector((state) => state.headerState);

  useEffect(() => {
    function handleResize() {
      setWidth(ref.current.getBoundingClientRect().width);
    }
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <HeaderWrapper>
      <div className="header-left">
        <Space wrap={false}>
          <LogoAndText fontSize={24} logoSize={24} />
          <CollapsedButton />
        </Space>
      </div>
      <div className="header-center" ref={ref}>
        <AutocompleteSearch width={width || 480} />
      </div>
      <div className="header-right">
        <Space split={<Divider type="vertical" />} wrap={false}>
          {isSignedIn ? (
            <ProfileDropdownMenu />
          ) : (
            <Space wrap={false}>
              <Button
                shape="round"
                type="link"
                extraType="btntag"
                disabled={headerState.dataRedirectStatus === "loading"}
                loading={headerState.dataRedirectStatus === "loading"}
              >
                <Link to="/login">Đăng nhập</Link>
              </Button>
              <Button
                type="primary"
                shape="round"
                disabled={headerState.dataRedirectStatus === "loading"}
              >
                <Link to="/register">Đăng kí</Link>
              </Button>
            </Space>
          )}

          <Space wrap={false} size={16}>
            <Link to="/store">
              <FaStore size={30} />
            </Link>
            <Badge count={1}>
              <Link to="/cart">
                <FaShoppingCart size={28} />
              </Link>
            </Badge>
          </Space>

          <ThemeButton type="dropdown" btntype={"text"} iconColor={"#595959"} />
        </Space>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
