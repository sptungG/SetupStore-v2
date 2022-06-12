import { useUserStorage } from "src/common/useUserStorage";
import LoadingToRedirect from "src/components/loader/LoadingToRedirect";
import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { credential, setCredential } = useUserStorage();
  if (credential.user == null)
    return <LoadingToRedirect />;

  return <Outlet />;
}
