import React, { lazy, Suspense, useEffect } from "react";
import { ConfigProvider } from "antd";
import { useChangeLang } from "common/useChangeLang";
import { currentUser } from "functions/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "common/firebase-config";
import { useUserStorage } from "common/useUserStorage";

import { Navigate, Route, Routes } from "react-router-dom";
import GuestRoute from "routes/GuestRoute";

import NotFound from "components/nav/NotFound";
import Loader from "components/loader/Loader";

const HomePage = lazy(() => import("pages/HomePage"));
const LoginPage = lazy(() => import("pages/auth/LoginPage"));

const App = () => {
  const { locale, localeName } = useChangeLang();
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
    <ConfigProvider locale={locale}>
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
    </ConfigProvider>
  );
};

export default App;
