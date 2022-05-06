import React from "react";
import { Link } from "react-router-dom";

export const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/setup-store-v2.appspot.com/o/setup-illustrative-icon.png?alt=media&token=36302d8f-410e-439e-af36-58901276b381";

const Logo = ({ size = 120 }) => {
  return (
    <Link to="/" id="logo-wrapper" className="logo-wrapper">
      <div id="logo-img" className="logo-img" style={{ width: size, height: size }}>
        <img
          alt="loader"
          src={LOGO_URL}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </Link>
  );
};

export default Logo;
