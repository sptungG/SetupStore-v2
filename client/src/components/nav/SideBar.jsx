import { Col, Drawer, Row, Space, Avatar, Typography } from "antd";
import React from "react";
import {
  BsBoxSeam,
  BsChatLeftText,
  BsCollection,
  BsHouseDoor,
  BsLayoutWtf,
  BsPeople,
} from "react-icons/bs";
import { FaStore } from "react-icons/fa";
import { FcAbout, FcLike, FcServices, FcShop, FcSms, FcViewDetails } from "react-icons/fc";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useChangeThemeProvider } from "src/common/useChangeThemeProvider";
import { setSidebarCollapsed } from "src/stores/header/header.reducer";
import styled from "styled-components";
import Button from "../button/Button";
import ThemeButton from "../button/ThemeButton";
import LogoAndText from "./LogoAndText";
import { useMediaQuery } from "react-responsive";

const SideMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  & .side-item {
    padding: 8px;
    width: 100%;
  }
  & .side-item.side-item-nav {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 8px;
    & .side-icon {
      flex: 0 0 32px;
      font-size: 20px;
      color: ${(props) => props.theme.generatedColors[5]};
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    & .side-content {
      flex: 1 1 auto;
      font-size: 16px;
    }
  }

  & .side-user {
    margin-top: auto;
  }

  & .side-item:hover {
    background-color: ${(props) => props.theme.generatedColors[0]};
  }
`;

const AvatarWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  position: relative;
`;

const SideBar = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const mediaBelow768 = useMediaQuery({ maxWidth: 768 });
  const headerState = useSelector((state) => state.headerState);
  const credential = useSelector((state) => state.auth);
  const { data: user } = useSelector((state) => state.user);
  const isSignedIn =
    user != null && credential.authtoken != null && credential.refreshToken != null;

  return (
    <Drawer
      closeIcon={null}
      title={null}
      placement={mediaBelow768 ? "right" : "left"}
      onClose={() => dispatch(setSidebarCollapsed(false))}
      visible={headerState.sidevisible}
      width={240}
      footer={
        isSignedIn ? (
          <Row wrap={false} gutter={16}>
            <Col flex="none">
              <Button size="large" shape="circle">
                <AvatarWrapper>
                  <Avatar
                    size={33}
                    src={user.picture ?? "https://source.unsplash.com/random?vietnam,nature"}
                    alt="avatar"
                  />
                </AvatarWrapper>
              </Button>
            </Col>
            <Col flex="auto">
              <Typography.Title
                level={5}
                ellipsis
                style={{ marginBottom: 2, cursor: "pointer" }}
                onClick={() => navigate("/profile")}
                title="Go to your profile"
              >
                {user.name}
              </Typography.Title>
              <Typography.Paragraph type="secondary" ellipsis style={{ marginBottom: 2 }}>
                {user.email}
              </Typography.Paragraph>
            </Col>
          </Row>
        ) : (
          <Space wrap={false} className="side-auth-action">
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
          </Space>
        )
      }
    >
      <SideMenuWrapper>
        <NavItem icon={<BsHouseDoor />} linkto={"/"}>
          Trang chủ
        </NavItem>
        <NavItem icon={<BsBoxSeam />} linkto={"/store"}>
          Sản phẩm
        </NavItem>
        <NavItem icon={<BsLayoutWtf />} linkto={"/combos"}>
          Bộ sưu tập
        </NavItem>
        <NavItem icon={<BsCollection />} linkto={"/categories"}>
          Danh mục
        </NavItem>
        <NavItem icon={<BsPeople />} linkto={"/about-us"}>
          Về chúng tôi
        </NavItem>
        <NavItem icon={<BsChatLeftText />} linkto={"/faq"}>
          FAQ
        </NavItem>
        {isSignedIn && (
          <div className="side-user">
            <NavItem icon={<FcViewDetails />} linkto={"/categories"}>
              Đơn hàng
            </NavItem>
            <NavItem icon={<FcLike />} linkto={"/about-us"}>
              Yêu thích
            </NavItem>
            <NavItem icon={<FcServices />} linkto={"/faq"}>
              Cài đặt
            </NavItem>
          </div>
        )}
      </SideMenuWrapper>
    </Drawer>
  );
};

const NavItem = ({ icon, children, linkto = "/" }) => {
  return (
    <Link to={linkto} className="side-item side-item-nav">
      <div className="side-icon">{icon}</div>
      <div className="side-content">{children}</div>
    </Link>
  );
};

export default SideBar;
