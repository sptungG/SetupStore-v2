import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredential } from "stores/auth/auth.reducer";

export function useUserStorage() {
  const credential = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return {
    credential,
    setCredential: (user, authtoken) => dispatch(setUserCredential({ user, authtoken })),
  };
}
