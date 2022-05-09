import { Alert, Button, Form, Input, Typography } from "antd";
import { auth } from "common/firebase-config";
import { useUserStorage } from "common/useUserStorage";
import { sendPasswordResetEmail } from "firebase/auth";
import GalleryBgLayout from "pages/GalleryBgLayout";
import React from "react";
import { HiOutlineMail } from "react-icons/hi";
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

const ForgotPasswordPage = (props) => {
  const [status, setStatus] = React.useState("");
  const { credential, setCredential, setEmailValueVerified } = useUserStorage();

  const [form] = Form.useForm();

  let navigate = useNavigate();

  const handleSubmit = ({ email }) => {
    setStatus("loading");
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    sendPasswordResetEmail(auth, email, config)
      .then(() => {
        form.resetFields();
        setStatus("success");
        toast.success("Check your email for password reset link");
        setEmailValueVerified(email);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        setStatus("error");
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };

  return (
    <GalleryBgLayout>
      <FormWrapperStyles>
        <div className="carousel-wrapper">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/setup-store-v2.appspot.com/o/forgot-password-amicoo.svg?alt=media&token=8a085927-017c-47b1-8774-60edc4985f3f"
            alt="forgot-password-amico"
          />
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
            <Typography.Title>Quên mật khẩu?</Typography.Title>
            <Form.Item
              name="email"
              label={
                <Typography.Title level={5} type="secondary" style={{ marginBottom: 2 }}>
                  Hãy nhập địa chỉ email của bạn để khôi phục mật khẩu.
                </Typography.Title>
              }
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
            <Form.Item style={{ marginTop: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="forgot-form-button"
                loading={status === "loading"}
                disabled={status === "loading"}
                block
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
          <p style={{ textAlign: "center" }}>
            Trở lại trang <Link to="/login">Đăng nhập</Link>
          </p>
          {status === "success" && (
            <Alert
              message={"Đường dẫn xác nhận đã được gửi đến email của bạn."}
              type="info"
              action={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"https://mail.google.com/mail/u/0/#inbox"}
                >
                  Đi đến hòm thư
                </a>
              }
            />
          )}
        </div>
      </FormWrapperStyles>
    </GalleryBgLayout>
  );
};
export default ForgotPasswordPage;
