import { Button, Result, Skeleton } from "antd";
import { auth } from "common/firebase-config";
import { useUserStorage } from "common/useUserStorage";
import ErrorResult from "components/nav/ErrorResult";
import { applyActionCode, reload } from "firebase/auth";
import { createOrUpdateUser } from "functions/auth";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const WrapperStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .verify-container {
    max-width: 800px;
    width: 100%;
    height: 100vh;
  }
`;

const VerificationPage = () => {
  const [status, setStatus] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const { credential, setCredential, setEmailValueVerified } = useUserStorage();
  let navigate = useNavigate();

  useEffect(() => {
    const parsed = queryString.parse(window.location.href);
    if (parsed && parsed.oobCode) {
      setVerifyCode(parsed.oobCode);
    }
  }, []);

  useEffect(() => {
    if (verifyCode) {
      handleVerifyEmail(verifyCode);
    }
  }, [verifyCode]);

  useEffect(() => {
    if (status === "verified") {
      handleSubmit();
    }
  }, [status]);

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const idTokenResult = await auth.currentUser.getIdTokenResult();
      let res = await createOrUpdateUser(idTokenResult.token);
      setCredential({
        ...res.data,
        authtoken: idTokenResult.token,
      });
      setEmailValueVerified(auth.currentUser.email);
      setStatus("success");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  };

  const handleVerifyEmail = async (code) => {
    setStatus("loading");
    try {
      await applyActionCode(auth, code);
      await reload(auth.currentUser);
      setStatus("verified");
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  };

  return (
    <WrapperStyles>
      <div className="verify-container">
        {status === "success" && (
          <Result
            status="success"
            title={"Congratulation!"}
            subTitle={`Email: ${auth.currentUser.email} đã đăng kí thành công`}
          ></Result>
        )}
        {status === "error" && <ErrorResult status="500" extra={<Button>Gửi lại đường dẫn</Button>} />}
        {status === "loading" && <Skeleton active />}
      </div>
    </WrapperStyles>
  );
};

export default VerificationPage;
