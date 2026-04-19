
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';


const googleProvider = new GoogleAuthProvider();

export const signUp = async (email, password, displayName) => {
  
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  
  await updateProfile(userCredential.user, { displayName });

  return userCredential;
};

export const logIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider);
};

export const logOut = async () => {
  return signOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
