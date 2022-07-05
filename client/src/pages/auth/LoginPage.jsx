import { Col, Divider, Form, Input, notification, Row, Space, Typography } from "antd";
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "src/common/firebase-config";
import Button from "src/components/button/Button";
import ThemeButton from "src/components/button/ThemeButton";
import CarouselGallery from "src/components/images/CarouselGallery";
import LogoAndText from "src/components/nav/LogoAndText";
import GalleryBgLayout from "src/layout/GalleryBgLayout";
import { useCreateOrUpdateUserMutation } from "src/stores/auth/auth.query";
import {
  setAuthtokenCredential,
  setEmailVerifiedValue,
  setRefreshToken,
} from "src/stores/auth/auth.reducer";
import { setDataRedirectStatus } from "src/stores/header/header.reducer";
import { setUser } from "src/stores/user/user.reducer";
import styled from "styled-components";

const FormWrapperStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  .carousel-wrapper {
    width: 100%;
    padding: 0 40px 24px 40px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .from-container {
    width: 100%;
  }
`;

const LoginPage = (props) => {
  const credential = useSelector((state) => state.auth);
  const [createOrUpdateUser] = useCreateOrUpdateUserMutation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({ email: credential.emailVerifiedValue });
  }, [credential.emailVerifiedValue, form]);

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (!user.emailVerified) throw new Error(`${user.email} hasn't verified yet!`);
      const idTokenResult = await user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token).unwrap();
      dispatch(setRefreshToken(user.refreshToken));
      dispatch(setAuthtokenCredential(idTokenResult.token));
      dispatch(setUser(res));
      dispatch(setEmailVerifiedValue(""));
      setLoading(false);
      navigate("/");
    } catch (error) {
      notification.error({
        message: error.message,
        btn: (
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://mail.google.com/mail/u/0/#inbox"}
            >
              Go to mailbox
            </a>
          </span>
        ),
      });
      setLoading(false);
    }
  };

  const googleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        const res = await createOrUpdateUser(idTokenResult.token).unwrap();
        dispatch(setAuthtokenCredential(idTokenResult.token));
        dispatch(setUser(res));
        setLoading(false);
      })
      .catch((err) => {
        notification.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <GalleryBgLayout>
      <FormWrapperStyles>
        <div className="carousel-wrapper">
          <CarouselGallery size={"100%"} />
        </div>
        <div className="from-container">
          <Form
            form={form}
            name="formAuth"
            onFinish={handleSubmit}
            size="large"
            layout="vertical"
            requiredMark={false}
          >
            <Row justify="space-between">
              <Typography.Title>Welcome back</Typography.Title>
              <ThemeButton type="dropdown" btntype="dashed" shape="circle" size="large" />
            </Row>
            <Typography.Title level={5} type="secondary">
              Đăng nhập nhanh <LogoAndText fontSize={16} /> với:
            </Typography.Title>
            <Row gutter={16}>
              <Col span={8}>
                <Button
                  onClick={() => {
                    signInWithRedirect(auth, googleAuthProvider);
                    window.history.replaceState(null, "", "/");
                  }}
                  size="large"
                  block
                  disabled={loading}
                  loading={loading}
                >
                  <FcGoogle size={24} />
                </Button>
              </Col>
              <Col span={8}>
                <Button size="large" block disabled>
                  <FaFacebookSquare size={24} color="#85a5ff" />
                </Button>
              </Col>
              <Col span={8}>
                <Button size="large" block disabled>
                  <BsInstagram size={24} color="#ff85c0" />
                </Button>
              </Col>
            </Row>
            <Divider plain>Hoặc</Divider>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Trường này không được để trống." },
                {
                  type: "email",
                  warningOnly: true,
                  message: "Hãy nhập đúng định dạng email.",
                },
              ]}
            >
              <Input prefix={<HiOutlineMail size={24} />} placeholder="Email..." />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Trường này không được để trống." },
                { min: 6, message: "Mật khẩu cần tối thiểu 6 kí tự." },
              ]}
            >
              <Input.Password
                prefix={<HiOutlineLockClosed size={24} />}
                type="password"
                placeholder="Mật khẩu..."
              />
            </Form.Item>
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                disabled={loading}
                block
              >
                Đăng nhập
              </Button>
              <p style={{ textAlign: "right" }}>
                <Link to="/forgot/password">Quên mật khẩu?</Link>
              </p>
            </Form.Item>
          </Form>
          <p style={{ textAlign: "center" }}>
            Bạn chưa có tài khoản? <Link to="/register">Đăng kí ngay</Link>
          </p>
        </div>
      </FormWrapperStyles>
    </GalleryBgLayout>
  );
};
export default LoginPage;
