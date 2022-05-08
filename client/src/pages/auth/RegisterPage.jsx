import { Alert, Button, Form, Input, Row, Typography } from "antd";
import { auth } from "common/firebase-config";
import { useUserStorage } from "common/useUserStorage";
import ThemeButton from "components/buttons/ThemeButton";
import CarouselGallery from "components/images/CarouselGallery";
import LogoAndText from "components/nav/LogoAndText";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification, signOut
} from "firebase/auth";
import GalleryBgLayout from "pages/GalleryBgLayout";
import React from "react";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
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
  }
  .from-container {
    width: 100%;
  }
`;

const RegisterPage = (props) => {
  const [form] = Form.useForm();
  const { credential, setCredential, setEmailValueVerified } = useUserStorage();
  const [status, setStatus] = React.useState("");
  let navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    setStatus("loading");
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(auth.currentUser);

      await signOut(auth);

      toast.success(
        <>
          Email is sent to {email}.<br />
          Click the link to complete your registration.
        </>
      );
      setStatus("success");
      setEmailValueVerified(email);
      form.resetFields();
    } catch (error) {
      toast.error(error.message);
      setStatus("error");
    }
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
              <Typography.Title>Create new account</Typography.Title>
              <ThemeButton type="icon" />
            </Row>
            <Form.Item
              name="email"
              label={
                <Typography.Title level={5} type="secondary" style={{ marginBottom: 2 }}>
                  Đăng kí tài khoản <LogoAndText fontSize={16} /> qua email
                </Typography.Title>
              }
              tooltip="Email để nhận đường dẫn xác nhận đăng kí"
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
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Bạn chưa xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu xác nhận chưa khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<HiOutlineLockClosed size={24} />}
                placeholder="Xác nhận mật khẩu..."
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                loading={status === "loading"}
                disabled={status === "loading"}
                block
              >
                Đăng kí
              </Button>
            </Form.Item>
          </Form>
          <p style={{ textAlign: "center" }}>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </p>
          {status === "success" && (
            <Alert
              message={"Đường dẫn xác nhận đã được gửi đến email của bạn."}
              type="info"
              action={
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
                    Đi đến hòm thư
                  </a>
                </span>
              }
            />
          )}
        </div>
      </FormWrapperStyles>
    </GalleryBgLayout>
  );
};
export default RegisterPage;
