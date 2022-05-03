import { Outlet } from "react-router-dom";
import Logo from "components/nav/Logo";

const LogoOnlyLayout = () => {
  return (
    <>
      <header id="header-logo-only">
        <Logo />
      </header>
      <Outlet />
    </>
  );
};

export default LogoOnlyLayout;
