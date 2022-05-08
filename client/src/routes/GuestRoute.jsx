import { useUserStorage } from "common/useUserStorage";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const { credential, setCredential } = useUserStorage();

  if (credential.user != null && credential.user?.emailVerified)
    return <Navigate to="/" replace />;

  return <Outlet />;
}
