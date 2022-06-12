import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredential, setEmailVerifiedValue } from "src/stores/auth/auth.reducer";

export function useUserStorage() {
  const credential = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return {
    credential,
    setEmailValueVerified: (value) => dispatch(setEmailVerifiedValue(value)),
    setCredential: (user, authtoken) => dispatch(setUserCredential({ user, authtoken })),
  };
}
