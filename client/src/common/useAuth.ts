import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = null;

  return useMemo(() => ({ user }), [user]);
};
