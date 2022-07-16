import { useState, useEffect, useContext, createContext } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fSignOut,
  sendPasswordResetEmail as fSendPasswordResetEmail,
  confirmPasswordReset as fConfirmPasswordReset,
} from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

const AuthContext = createContext();

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", response.user.uid), {
      uid: response.user.uid,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
      email,
    });
  };

  const signOut = async () => {
    await fSignOut(auth);
  };

  const sendPasswordResetEmail = async (email) => {
    await fSendPasswordResetEmail(auth, email);
  };

  const confirmPasswordReset = async (password, oobCode) => {
    await fConfirmPasswordReset(auth, oobCode, password);
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
