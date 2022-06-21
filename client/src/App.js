import { ConfigProvider } from "antd";
import "antd/dist/antd.variable.min.css";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { auth } from "src/common/firebase-config";
import { ThemeProvider } from "styled-components";
import { useChangeThemeProvider } from "./common/useChangeThemeProvider";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "src/components/loader/Loader";
import ErrorResult from "src/components/nav/ErrorResult";
import GuestRoute from "./routes/GuestRoute";
import { useCreateOrUpdateUserMutation, useCurrentUserMutation } from "./stores/auth/auth.query";
import {
  setAuthtokenCredential,
  setRefreshToken,
  setUserCredential,
} from "./stores/auth/auth.reducer";
import { persistor } from "./stores/store";
import { useRefreshState } from "./common/useRefreshState";

const HomePage = lazy(() => import("src/pages/home/HomePage"));
const LoginPage = lazy(() => import("src/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("src/pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("src/pages/auth/ForgotPasswordPage"));
const VerificationPage = lazy(() => import("src/pages/auth/VerificationPage"));

function App() {
  const { exchangeToken } = useRefreshState();
  const credential = useSelector((state) => state.auth);
  const [
    currentUser,
    { isError: currentUserError, isSuccess: currentUserSuccess, isLoading: currentUserLoading },
  ] = useCurrentUserMutation();
  const [createOrUpdateUser] = useCreateOrUpdateUserMutation();
  const { themeProvider } = useChangeThemeProvider();
  const dispatch = useDispatch();

  useEffect(() => {
    if (credential.authtoken == null) {
      getRedirectResult(auth)
        .then(async (result) => {
          if (!result) return;
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();
          const res = await createOrUpdateUser(idTokenResult.token).unwrap();
          dispatch(setRefreshToken(user.refreshToken));
          dispatch(setAuthtokenCredential(idTokenResult.token));
          dispatch(setUserCredential(res));
        })
        .catch((err) => {
          console.log("signInWithRedirect ~ err", err);
        });
    }
  }, []);

  useEffect(() => {
    if (credential.authtoken) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const idTokenResult = await user.getIdTokenResult();
            const res = await currentUser(idTokenResult.token).unwrap();
            dispatch(setAuthtokenCredential(idTokenResult.token));
            dispatch(setUserCredential(res));
            return;
          } catch (err) {
            const res = await exchangeToken(user.refreshToken);
            dispatch(setRefreshToken(res.data.refresh_token));
            dispatch(setAuthtokenCredential(res.data.id_token));
          }
        }
      });
      return () => unsubscribe();
    }
  }, [credential.authtoken]);

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
      <PersistGate loading={null} persistor={persistor}>
        {/* <LoadingBarContainer
          maxProgress={85}
          updateTime={100}
          progressIncrease={10}
          style={{ backgroundColor: '#08f', position: "fixed" }}
        /> */}
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
      </PersistGate>
    </ThemeProvider>
  );
}

export default App;
