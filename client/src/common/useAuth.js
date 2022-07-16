import { message, Space } from "antd";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useChangeThemeProvider } from "./useChangeThemeProvider";

export function useAuth() {
  const credential = useSelector((state) => state.auth);
  const { data: user } = useSelector((state) => state.user);
  const { themeProvider } = useChangeThemeProvider();
  let navigate = useNavigate();
  const isSignedIn =
    user != null && credential.authtoken != null && credential.refreshToken != null;

  // console.log("useAddToCart ~ cart", cart);

  const message401 = () => {
    message.loading({
      content: (
        <>
          <div>Đăng nhập rồi mới thao tác được!</div>
          <Space
            style={{ color: themeProvider.primaryColor, textDecoration: "underline" }}
            wrap={false}
            size={2}
          >
            <BsBoxArrowUpRight /> <span>Đi đến đăng nhập ngay</span>
          </Space>
        </>
      ),
      style: { cursor: "pointer" },
      onClick: () => navigate("/login", { replace: true }),
      duration: 4,
    });
    return;
  };

  return {
    isSignedIn,
    user,
    credential,
    message401,
  };
}
