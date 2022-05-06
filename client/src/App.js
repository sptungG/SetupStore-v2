import React, { lazy, Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useChangeLang } from "common/useChangeLang";
import { currentUser } from "functions/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "common/firebase-config";
import { useUserStorage } from "common/useUserStorage";

import { Navigate, Route, Routes } from "react-router-dom";
import GuestRoute from "routes/GuestRoute";

import NotFound from "components/nav/NotFound";
import Loader from "components/loader/Loader";
import { useChangeTheme } from "common/useChangeTheme";

const HomePage = lazy(() => import("pages/home/HomePage"));
const LoginPage = lazy(() => import("pages/auth/LoginPage"));

const App = () => {
  const { theme, changeTheme } = useChangeTheme();
  const { credential, setCredential } = useUserStorage();

  useEffect(() => {
    changeTheme("light");
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
          </Route>
          <Route path="/404" element={<NotFound />} />

          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
