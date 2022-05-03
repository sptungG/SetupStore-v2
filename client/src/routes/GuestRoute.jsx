import { useUserStorage } from "common/useUserStorage";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const { credential, setCredential } = useUserStorage();

  if (credential?.authtoken) return <Navigate to="/" replace />;

  return <Outlet />;
}
