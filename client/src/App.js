import { ConfigProvider } from "antd";
import "antd/dist/antd.variable.min.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { currentUser } from "src/functions/auth";
import { auth } from "src/common/firebase-config";
import { useChangeThemeProvider } from "./common/useChangeThemeProvider";

import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "src/components/loader/Loader";
import ErrorResult from "src/components/nav/ErrorResult";
import GuestRoute from "./routes/GuestRoute";
import { useUserStorage } from "./common/useUserStorage";

const HomePage = lazy(() => import("src/pages/home/HomePage"));
const LoginPage = lazy(() => import("src/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("src/pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("src/pages/auth/ForgotPasswordPage"));
const VerificationPage = lazy(() => import("src/pages/auth/VerificationPage"));

function App() {
  const { themeProvider, changeThemeProvider } = useChangeThemeProvider();

  const { credential, setCredential, setEmailValueVerified } = useUserStorage();
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus("loading");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const res = await currentUser(idTokenResult.token);
        setCredential(res.data, idTokenResult.token);
      }
      setStatus("success");
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: themeProvider.primaryColor,
      },
    });
  }, [themeProvider.primaryColor]);

  return (
    <ThemeProvider
      theme={{
        mode: themeProvider.mode,
        primaryColor: themeProvider.primaryColor,
        generatedColors: themeProvider.generatedColors,
      }}
    >
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verification/*" element={<VerificationPage />} />
            <Route path="/forgot/password" element={<ForgotPasswordPage />} />
          </Route>
          <Route path="/404" element={<ErrorResult status="404" />} />

          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
