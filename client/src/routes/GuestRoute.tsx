import { useAuth } from "common/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}
