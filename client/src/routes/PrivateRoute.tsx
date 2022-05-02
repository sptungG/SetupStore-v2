import { useAuth } from "common/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />

  return <Outlet />
}