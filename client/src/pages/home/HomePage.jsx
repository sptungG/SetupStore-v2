import { Space } from "antd";
import { useUserStorage } from "common/useUserStorage";
import LogoutButton from "components/buttons/LogoutButton";
import MainLayout from "pages/MainLayout";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { credential, setCredential } = useUserStorage();
  const isSignedIn = credential.user == null;
  return (
    <MainLayout>
      HomePage
      <div>user: {JSON.stringify(credential.user)}</div>
      <Space size={8}>
      <LogoutButton iconSize={18}>Đăng xuất</LogoutButton>
      {isSignedIn && <Link to={"/login"}>Đăng nhập</Link>}
      {isSignedIn && <Link to={"/register"}>Đăng kí</Link>}
      </Space>
    </MainLayout>
  );
};

export default HomePage;
