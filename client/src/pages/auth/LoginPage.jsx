import React from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { Form, Input, Button, Layout, Typography, Row, Col, Space, Divider, Card } from "antd";

import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

import { auth, googleAuthProvider } from "common/firebase-config";
import { createOrUpdateUser } from "functions/auth";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useUserStorage } from "common/useUserStorage";
import GalleryBgLayout from "pages/GalleryBgLayout";
import CarouselGallery from "components/images/CarouselGallery";
import ThemeButton from "components/buttons/ThemeButton";
import LogoAndText from "components/nav/LogoAndText";

const LoginPage = (props) => {
  console.log("LoginPage ~ props", props);
  const [loading, setLoading] = React.useState(false);
  const { credential, setCredential } = useUserStorage();

  const [form] = Form.useForm();

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          setCredential(res.data, idTokenResult.token);
          setLoading(false);
        })
        // .then((res) => {
        //   roleBasedRedirect(res.data.role);
        // })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            // console.log("CREATE OR UPDATE RES", res);
            setCredential(res.data, idTokenResult.token);
            setLoading(false);
          })
          // .then((res) => {
          //   roleBasedRedirect(res.data.role);
          // })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <GalleryBgLayout>
      <Row justify="center" align="middle" gutter={24} style={{ height: "100%" }}>
        <Col span={18}>
          <CarouselGallery size={"100%"} />
        </Col>
        <Col span={24}>
          <Form
            form={form}
            name="formAuth"
            onFinish={handleSubmit}
            size="large"
            layout="vertical"
            requiredMark={false}
          >
            <Typography.Title>Welcome back</Typography.Title>
            <Typography.Title level={5} type="secondary">
              Đăng nhập vào <LogoAndText fontSize={16} />
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
        </Col>
        <Col span={24}>
          <ThemeButton />
        </Col>
      </Row>
    </GalleryBgLayout>
  );
};
export default LoginPage;
