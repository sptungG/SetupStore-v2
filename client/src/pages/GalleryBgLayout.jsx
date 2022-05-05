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
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
  .modal-overlay #gallery {
    position: fixed;
    top: 0;
    left: 0;
    transform: rotate(-28deg) translateY(-40%);
    width: 100%;
    height: 100%;
    min-width: 1440px;
    z-index: 0;
    flex-shrink: 0;
  }
  .modal-overlay #gallery #skeleton {
    height: 300px;
  }
  .logo-wrapper {
    position: absolute;
    left: 48px;
    top: 24px;
    z-index: 20;
    border-radius: 8px;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 125%;
      height: 125%;
      background: url("https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62")
        no-repeat;
      background-size: cover;
      filter: blur(12px);
      z-index: 10;
    }
  }
  .btn-theme {
    position: absolute;
    top: 48px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
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
`;

const GalleryBgLayout = ({ children }) => {
  return (
    <PageStyles>
      <div className="modal-overlay">
        <Gallery count={20} column={4} />
        <Logo />
        <ThemeButton />
      </div>
      <div className="modal-content">{children}</div>
    </PageStyles>
  );
};

export default GalleryBgLayout;
