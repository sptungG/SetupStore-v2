import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const credential = useSelector((state) => state.auth);

  if (credential.user != null)
    return <Navigate to="/" replace />;

  return <Outlet />;
}
