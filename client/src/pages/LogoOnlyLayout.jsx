import { Layout } from "antd";
import ThemeButton from "components/buttons/ThemeButton";
import LogoAndText from "components/nav/LogoAndText";
const LogoOnlyLayout = ({ children }) => {
  return (
    <>
      <header id="header-logo-only">
        <LogoAndText logoSize={48}/>
        <ThemeButton/>
      </header>
      <Layout.Content>{children}</Layout.Content>
    </>
  );
};

export default LogoOnlyLayout;
