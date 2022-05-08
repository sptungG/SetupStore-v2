import { useUserStorage } from "common/useUserStorage";
import LoadingToRedirect from "components/loader/LoadingToRedirect";
import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { credential, setCredential } = useUserStorage();
  if (credential.user == null || !credential.user?.role || !credential.user?.emailVerified)
    return <LoadingToRedirect />;

  return <Outlet />;
}
