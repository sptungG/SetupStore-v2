import React from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { Form, Input, Button, Layout, Typography, Row, Col, Space, Divider, Card } from "antd";

import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

import { auth, googleAuthProvider } from "common/firebase-config";
import { createOrUpdateUser } from "functions/auth";

import LogoOnlyLayout from "../LogoOnlyLayout";
import Loader from "components/loader/Loader";
import Gallery from "components/images/Gallery";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useUserStorage } from "common/useUserStorage";
import GalleryBgLayout from "pages/GalleryBgLayout";

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
          Come to the Dashboard
        </Typography.Title>
        <Space align="baseline">
          <span>Login with: </span>
          <Button onClick={googleLogin} size="large">
            <FcGoogle size={24} />
          </Button>
        </Space>
        <Divider plain>Or</Divider>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "You should input email." },
            {
              type: "email",
              warningOnly: true,
              message: "Please input a valid email.",
            },
          ]}
        >
          <Input prefix={<HiOutlineMail size={24} />} placeholder="Enter your email..." />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "You should input password." }]}
        >
          <Input.Password
            prefix={<HiOutlineLockClosed size={24} />}
            type="password"
            placeholder="Enter your password..."
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
            style={{ width: "100%" }}
          >
            Login
          </Button>
          <p style={{ textAlign: "right" }}>
            <Link to="/forgot/password">Forgot Password</Link>
          </p>
        </Form.Item>
      </Form>
      <p style={{ textAlign: "center" }}>
        Don't have an account? <Link to="/register">Create now</Link>
      </p>
    </GalleryBgLayout>
  );
};
export default LoginPage;
