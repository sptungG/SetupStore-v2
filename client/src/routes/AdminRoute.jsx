import LoadingToRedirect from "src/components/loader/LoadingToRedirect";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute() {
  const credential = useSelector((state) => state.auth);
  const { data: user } = useSelector((state) => state.user);

  if (user && user?.role !== "admin") return <LoadingToRedirect />;

  return <Outlet />;
}
