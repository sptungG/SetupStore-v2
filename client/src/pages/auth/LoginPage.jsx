import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import { auth, googleAuthProvider } from "common/firebase-config";
import { useUserStorage } from "common/useUserStorage";
import ThemeButton from "components/buttons/ThemeButton";
import CarouselGallery from "components/images/CarouselGallery";
import LogoAndText from "components/nav/LogoAndText";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createOrUpdateUser } from "functions/auth";
import GalleryBgLayout from "pages/GalleryBgLayout";
import React, { useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const FormWrapperStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  .carousel-wrapper {
    width: 100%;
    padding: 0 48px 24px 48px;
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
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { credential, setCredential } = useUserStorage();

  useEffect(() => {
    form.setFieldsValue({ email: credential.emailVerifiedValue });
  }, [form]);

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const idTokenResult = await user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token);
      setCredential({
        ...res.data,
        authtoken: idTokenResult.token,
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        console.log(".then ~ user", user);
        const idTokenResult = await user.getIdTokenResult();

        const res = await createOrUpdateUser(idTokenResult.token);
        // console.log("CREATE OR UPDATE RES", res);
        setCredential({
          ...res.data,
          authtoken: idTokenResult.token,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("googleLogin ~ err", err);
        toast.error(err.message);
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
              <ThemeButton type="icon" />
            </Row>
            <Typography.Title level={5} type="secondary">
              Đăng nhập nhanh <LogoAndText fontSize={16} /> với:
            </Typography.Title>
            <Row gutter={16}>
              <Col span={8}>
                <Button onClick={googleLogin} size="large" block>
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
