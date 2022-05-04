import { Layout } from "antd";
import Header from "components/nav/Header";
import Footer from "components/nav/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <Layout.Content>{children}</Layout.Content>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
