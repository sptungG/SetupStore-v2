import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const credential = useSelector((state) => state.auth);
  const { data: user } = useSelector((state) => state.user);

  if (user != null) return <Navigate to="/" replace />;

  return <Outlet />;
}
