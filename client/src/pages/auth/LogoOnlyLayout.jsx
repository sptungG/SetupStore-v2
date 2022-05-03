import Logo from "components/nav/Logo";
import { Layout } from "antd";
import ThemeButton from "components/buttons/ThemeButton";
const LogoOnlyLayout = ({ children }) => {
  return (
    <>
      <header id="header-logo-only">
        <Logo />
        <ThemeButton/>
      </header>
      <Layout.Content>{children}</Layout.Content>
    </>
  );
};

export default LogoOnlyLayout;
