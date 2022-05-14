import { useChangeCollapsed } from "common/useChangeCollapsed";
import DropdownMenu from "components/nav/DropdownMenu";
import Footer from "components/nav/Footer";
import Header from "components/nav/Header";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  position: relative;
  overflow: hidden;
  min-height: 50vh;
`;

const MainLayout = ({ children }) => {
  const { collapsed } = useChangeCollapsed();
  return (
    <>
      <Header />
      <Wrapper>
        <DropdownMenu />
        {children}
      </Wrapper>
      <Footer />
    </>
  );
};

export default MainLayout;
