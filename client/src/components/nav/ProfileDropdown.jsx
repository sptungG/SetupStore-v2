import { Avatar, Button, Dropdown, Menu, Space, Typography } from "antd";
import { auth } from "common/firebase-config";
import { useUserStorage } from "common/useUserStorage";
import { signOut } from "firebase/auth";
import React from "react";
import { FaAlignRight, FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const AvatarWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  position: relative;
  & .dropdown-caret {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(6px);
    z-index: -1;
    color: #d9d9d9;
  }
  &:hover .dropdown-caret {
    color: #9147ff;
  }
`;

const iconSize = 22;
const dropdownItemStyle = { borderRadius: 8 };
const dropdownTextStyle = {
  padding: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontWeight: 600,
  gap: 16,
};

const LogoutItem = () => {
  const { credential, setCredential } = useUserStorage();
  let navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      setCredential(null, null);
      navigate("/");
    } catch (error) {
      console.log("handleLogout ~ error", error);
    }
  };
  return (
    <div style={dropdownTextStyle} onClick={logout}>
      <span style={{ fontWeight: "normal" }}>Logout</span> <FiLogOut size={iconSize} />
    </div>
  );
};

const ProfileDropdownMenu = () => {
  const { credential } = useUserStorage();
  const { user } = credential;

  const items = [
    {
      label: (
        <Link to="/profile" style={dropdownTextStyle}>
          <Space direction="vertical" size={0}>
            <Typography.Text>Tài khoản</Typography.Text>
            <Typography.Text type="secondary" style={{ width: 100 }} ellipsis>
              {user.name}
            </Typography.Text>
          </Space>
          <FaRegUserCircle size={iconSize} />
        </Link>
      ),
      key: "profile",
    },
    {
      label: (
        <Link to="/history" style={dropdownTextStyle}>
          Đơn hàng <RiHistoryFill size={iconSize} />
        </Link>
      ),
      key: "history",
    },
    {
      label: <LogoutItem />,
      key: "logout",
    },
  ];

  const menu = <Menu style={{ borderRadius: 8, padding: 8 }} items={items} />;
  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Space size="small" align="center" style={{ display: "flex" }}>
        <Button size="large" shape="circle">
          <AvatarWrapper>
            <Avatar
              size={33}
              src={user.picture ?? "https://source.unsplash.com/random?vietnam,nature"}
              alt="avatar"
            />
            <FaAlignRight className="dropdown-caret" size={24} />
          </AvatarWrapper>
        </Button>
      </Space>
    </Dropdown>
  );
};

export default ProfileDropdownMenu;
