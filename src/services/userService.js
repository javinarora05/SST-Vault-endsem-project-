
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export const createUserProfile = async (uid, profileData) => {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    ...profileData,
    role: 'user', 
    createdAt: new Date().toISOString(),
    bookmarks: [],
  });
};

export const getUserProfile = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const updateUserRole = async (uid, role) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { role });
};

export const toggleBookmark = async (uid, eventId, currentBookmarks = []) => {
  const userRef = doc(db, 'users', uid);
  let updatedBookmarks;

  if (currentBookmarks.includes(eventId)) {
    
    updatedBookmarks = currentBookmarks.filter((id) => id !== eventId);
  } else {
    
    updatedBookmarks = [...currentBookmarks, eventId];
  }

  await updateDoc(userRef, { bookmarks: updatedBookmarks });
  return updatedBookmarks;
};
