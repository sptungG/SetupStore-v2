import { Col, Drawer, Row, Space, Avatar, Typography } from "antd";
import React from "react";
import { BsBoxSeam, BsCollection, BsHouseDoor, BsLayoutWtf, BsPeople } from "react-icons/bs";
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
  const headerState = useSelector((state) => state.headerState);
  const credential = useSelector((state) => state.auth);
  const isSignedIn = credential.user != null && credential.authtoken != null;
  const { user } = credential;
  let navigate = useNavigate();

  return (
    <Drawer
      closeIcon={null}
      title={null}
      placement="left"
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
            <Button shape="round" type="link" extraType="btntag">
              <Link to="/login">Đăng nhập</Link>
            </Button>
            <Button type="primary" shape="round">
              <Link to="/register">Đăng kí</Link>
            </Button>
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
        <NavItem icon={<FcAbout />} linkto={"/about-us"}>
          Về chúng tôi
        </NavItem>
        <NavItem icon={<FcSms />} linkto={"/faq"}>
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