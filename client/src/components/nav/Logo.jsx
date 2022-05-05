import React from "react";
import { Link } from "react-router-dom";

export const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62";

const Logo = () => {
  return (
    <Link to="/" id="logo-wrapper" className="logo-wrapper">
      <img alt="loader" src={LOGO_URL} />
    </Link>
  );
};

export default Logo;
