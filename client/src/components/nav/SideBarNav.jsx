import { Affix, Button, Layout, Menu } from "antd";
import { useChangeCollapsed } from "common/useChangeCollapsed";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaIndent, FaOutdent, FaTruck, FaCog } from "react-icons/fa";
import LogoAndText from "./LogoAndText";
import styled from "styled-components";

const NavWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  .nav-top {

  }
  .btn-collapsed{
    margin-left: auto;
  }
  .nav-center {
    margin-top: 24px;
  }
  .nav-bottom {
  }
`;

const items = [
  {
    label: "Trang chủ",
    key: "/",
    icon: <FaHome />,
  },
  {
    label: "Cài đặt",
    key: "/setting",
    icon: <FaCog />,
  },
];

const SideBarNav = () => {
  const { collapsed } = useChangeCollapsed();
  let { pathname } = useLocation();
  return (
    <Affix offsetTop={0.001}>
      <Layout.Sider
        id="SideBarNav"
        width={"100%"}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ minHeight: "100vh", overflow: "hidden", backgroundColor: "transparent" }}
      >
        <NavWrapper>
          <div className="nav-top">
            {collapsed ? (
              <LogoAndText logoSize={48} />
            ) : (
              <LogoAndText logoSize={48} fontSize={28} />
            )}
          </div>
          <div className="nav-center">
            <Menu
              theme="light"
              mode="inline"
              style={{ borderRight: "none", backgroundColor: "transparent" }}
              defaultSelectedKeys={[pathname]}
              items={items}
            />
          </div>
          <div className="nav-bottom">
          </div>
        </NavWrapper>
      </Layout.Sider>
    </Affix>
  );
};

export default SideBarNav;
