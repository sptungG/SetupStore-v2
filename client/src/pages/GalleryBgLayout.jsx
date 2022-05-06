import React from "react";
import Gallery from "components/images/Gallery";
import styled from "styled-components";
import { Col, Row } from "antd";
import CarouselGallery from "components/images/CarouselGallery";
import ThemeButton from "components/buttons/ThemeButton";
import Logo from "components/nav/Logo";

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
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    & .logo-wrapper {
      position: absolute;
      top: 24px;
      left: 48px;
      z-index: 20;
    }
    & .btn-theme {
      position: absolute;
      top: 24px;
      right: 48px;
      z-index: 20;
    }
  }
  .modal-content {
    z-index: 20;
    max-width: 480px;
    width: 100%;
    padding: 0 48px;
    height: 100vh;
    backdrop-filter: blur(10px);
    background-color: ${(props) =>
      props.theme.mode === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(20, 20, 20, 0.8)"};
    box-shadow: 0px 0px 16px 16px rgba(140, 140, 140, 0.25);
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
      </div>
      <header className="header">
        <Logo />
      </header>
      <div className="modal-content">{children}</div>
    </PageStyles>
  );
};

export default GalleryBgLayout;
