import React, { lazy, Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useChangeLang } from "common/useChangeLang";
import { currentUser } from "functions/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "common/firebase-config";
import { useUserStorage } from "common/useUserStorage";

import { Navigate, Route, Routes } from "react-router-dom";
import GuestRoute from "routes/GuestRoute";

import ErrorResult from "components/nav/ErrorResult";
import Loader from "components/loader/Loader";
import { useChangeTheme } from "common/useChangeTheme";

const HomePage = lazy(() => import("pages/home/HomePage"));
const LoginPage = lazy(() => import("pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("pages/auth/RegisterPage"));
const RegistrationCompletePage = lazy(() => import("pages/auth/RegistrationCompletePage"));
const ForgotPasswordPage = lazy(() => import("pages/auth/ForgotPasswordPage"));

const App = () => {
  const { theme, changeTheme } = useChangeTheme();
  const { credential, setCredential } = useUserStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            setCredential(res.data, idTokenResult.token);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/complete" element={<RegistrationCompletePage />} />
            <Route path="/forgot/password" element={<ForgotPasswordPage />} />
          </Route>
          <Route path="/404" element={<ErrorResult status="404" />} />

          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
