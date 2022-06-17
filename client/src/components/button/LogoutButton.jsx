import React from "react";
import Button from "./Button";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "common/firebase-config";
import { useUserStorage } from "common/useUserStorage";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ iconSize = 24, btnType = "text", children }) => {
  const { setCredential } = useUserStorage();
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCredential(null, null);
      navigate("/");
    } catch (error) {
      console.log("handleLogout ~ error", error);
    }
  };

  return (
    <Button className="btn-logout" type={btnType} size="large" onClick={handleLogout}>
      <div style={{ display: "flex", flexWrap: "nowrap", gap: 4, alignItems: "center" }}>
        {iconSize > 0 && <FiLogOut size={iconSize} />}
        <div>{children}</div>
      </div>
    </Button>
  );
};

export default LogoutButton;
