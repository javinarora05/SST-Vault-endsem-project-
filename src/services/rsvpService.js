
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  increment,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export const toggleRSVP = async (userId, eventId) => {
  
  const rsvpId = `${userId}_${eventId}`;
  const rsvpRef = doc(db, 'rsvps', rsvpId);
  const eventRef = doc(db, 'events', eventId);

  const existing = await getDoc(rsvpRef);

  if (existing.exists()) {
    
    await deleteDoc(rsvpRef);
    
    await updateDoc(eventRef, { rsvpCount: increment(-1) });
    return false; 
  } else {
    
    await setDoc(rsvpRef, {
      userId,
      eventId,
      createdAt: new Date().toISOString(),
    });
    
    await updateDoc(eventRef, { rsvpCount: increment(1) });
    return true; 
  }
};

export const getUserRSVPs = async (userId) => {
  const q = query(collection(db, 'rsvps'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data().eventId);
};

export const checkRSVP = async (userId, eventId) => {
  const rsvpId = `${userId}_${eventId}`;
  const rsvpRef = doc(db, 'rsvps', rsvpId);
  const snapshot = await getDoc(rsvpRef);
  return snapshot.exists();
};
