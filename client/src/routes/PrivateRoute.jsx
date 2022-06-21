import LoadingToRedirect from "src/components/loader/LoadingToRedirect";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const credential = useSelector((state) => state.auth);
  if (credential.user == null) return <LoadingToRedirect />;

  return <Outlet />;
}
