import React from "react";
import Gallery from "components/images/Gallery";
import styled from "styled-components";
import Logo from "components/nav/Logo";
import ThemeButton from "components/buttons/ThemeButton";

const PageStyles = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.25);
  }
  .modal-overlay #gallery {
    position: fixed;
    top: 0;
    left: 0;
    transform: rotate(-28deg) translateY(-40%);
    width: 100vw;
    height: 100vh;
    min-width: 1440px;
    z-index: 0;
    flex-shrink: 0;
  }
  .modal-overlay #gallery #skeleton {
    height: 300px;
  }
  .modal-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 20;
    max-width: 480px;
    width: 100%;
    padding: 0 48px;
    height: 100vh;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 16px 16px rgba(0, 0, 0, 0.25);
  }
  .modal-content form {
    width: 100%;
  }
  /* .header {
    position: absolute;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 20;
    padding: 0 48px;
  } */
  .header .logo-wrapper {
    position: absolute;
    left: 48px;
    top: 24px;
    z-index: 20;
    /* backdrop-filter: blur(4px);
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0px 0px 8px 8px rgba(255, 255, 255, 0.25); */
    border-radius: 8px;
  }
`;

const GalleryBgLayout = ({ children }) => {
  return (
    <PageStyles>
      <div className="modal-overlay">
        <header className="header">
          <Logo />
        </header>
        <Gallery count={20} column={4} />
      </div>
      <div className="modal-content">{children}</div>
    </PageStyles>
  );
};

export default GalleryBgLayout;
