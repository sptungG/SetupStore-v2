import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import logo00 from "assets/logo00.svg";

const gradient = keyframes`
0% {
  background-position: 0 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0 50%;
}`;

const LogoWrapper = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: end;
  flex-shrink: 0;
  column-gap: 4;
  .logo-img {
    width: ${(props) => props.logoSize + "px"};
    height: ${(props) => props.logoSize + "px"};
    padding: 2px;
    border-radius: 50%;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .logo-text {
    font-size: ${(props) => props.fontSize + "px"} !important;
    font-weight: ${(props) => props.fontWeight} !important;
    animation: ${gradient} 5s ease-in-out infinite;
    background: linear-gradient(to right, #a970ff, #d1b3ff, #9147ff, #772ce8);
    background-size: 300%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const LogoAndText = ({ logoSize = 0, fontSize = 0, fontWeight = 500 }) => {
  return (
    <Link to="/" className="logo-wrapper">
      <LogoWrapper
        logoSize={logoSize}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {logoSize > 0 && (
          <div className="logo-img" size={logoSize}>
            <img alt="logo" src={logo00} />
          </div>
        )}
        {fontSize > 0 && <span className="logo-text">SetupStore</span>}
      </LogoWrapper>
    </Link>
  );
};

export default LogoAndText;

export const Logo = ({ logoSize = 0, fontSize = 0, fontWeight = 500 }) => {
  return (
    <span role="img" aria-label="desktop" className="anticon anticon-desktop ant-menu-item-icon">
      <Link to="/" className="logo-wrapper">
        <LogoWrapper
          logoSize={logoSize}
          fontSize={fontSize}
          fontWeight={fontWeight}
        >
          {logoSize > 0 && (
            <div className="logo-img" size={logoSize}>
              <img alt="logo" src={logo00} />
            </div>
          )}
        </LogoWrapper>
      </Link>
    </span>
  );
};