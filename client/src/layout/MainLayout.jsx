import Footer from "src/components/nav/Footer";
import Header from "src/components/nav/Header";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.main` 
  position: relative;
  overflow: hidden;
  min-height: 100vh;
`;

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>
        {children}
      </Wrapper>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
