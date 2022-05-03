import React, { useState, useEffect, useContext, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredential } from "stores/auth/reducer";

import { auth } from "./firebase-config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { useLocalStorage } from "./useLocalStorage";

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const { storedValue: emailForRegistration, setValue: setEmailForRegistration } = useLocalStorage(
    "emailForRegistration",
    ""
  );
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const onSignin = async (email, password) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    setUser(user);
  };

  const onRegister = async (email) => {
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, config);
    setEmailForRegistration(email);
    return email;
  };

  const onCompleteRegister = async (email, password) => {
    const { user } = await signInWithEmailLink(auth, email, window.location.href);
    if (user.emailVerified) {
      window.localStorage.removeItem("emailForRegistration");
      let currentUser = auth.currentUser;
      await currentUser.updatePassword(password);
      const idTokenResult = await user.getIdTokenResult();
      return idTokenResult.token;
    }
    return "";
  };
  const onSignOut = async () => {
    await signOut(auth);
    setUser(false);
  };
  const onSendPasswordResetEmail = async (email) => {
    await sendPasswordResetEmail(email);
    return true;
  };
  const onConfirmPasswordReset = async (code, password) => {
    await confirmPasswordReset(code, password);
    return true;
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    user,
    onSignin,
    onRegister,
    onCompleteRegister,
    onSignOut,
    onSendPasswordResetEmail,
    onConfirmPasswordReset,
  };
}
