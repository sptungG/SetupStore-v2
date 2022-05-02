import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { useToggleMode } from "common/useToggleMode";

import NotFound from "components/nav/NotFound";
import Loader from "components/loader/Loader";
import GuestRoute from "routes/GuestRoute";
const LogoOnlyLayout = lazy(() => import("layouts/LogoOnlyLayout"));
const HomePage = lazy(() => import("pages/HomePage"));
const LoginPage = lazy(() => import("pages/auth/LoginPage"));

const App = () => {
  const { theme } = useToggleMode();

  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<LogoOnlyLayout />}>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="/404" element={<NotFound />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
