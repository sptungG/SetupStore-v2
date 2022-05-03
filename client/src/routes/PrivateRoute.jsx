import { useAuth } from "common/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />

  return <Outlet />
}