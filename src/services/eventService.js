
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';


const eventsCollection = collection(db, 'events');

export const createEvent = async (eventData) => {
  const docRef = await addDoc(eventsCollection, {
    ...eventData,
    
    date: Timestamp.fromDate(new Date(eventData.date)),
    createdAt: Timestamp.now(),
    rsvpCount: 0,
  });
  return docRef.id;
};

export const updateEvent = async (eventId, updates) => {
  const eventRef = doc(db, 'events', eventId);

  
  if (updates.date) {
    updates.date = Timestamp.fromDate(new Date(updates.date));
  }

  await updateDoc(eventRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

export const deleteEvent = async (eventId) => {
  const eventRef = doc(db, 'events', eventId);
  await deleteDoc(eventRef);
};

export const getEvents = async () => {
  const q = query(eventsCollection, orderBy('date', 'asc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    
    date: doc.data().date?.toDate?.()?.toISOString() || doc.data().date,
    createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
  }));
};

export const getEventById = async (eventId) => {
  const eventRef = doc(db, 'events', eventId);
  const snapshot = await getDoc(eventRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
    date: snapshot.data().date?.toDate?.()?.toISOString() || snapshot.data().date,
    createdAt: snapshot.data().createdAt?.toDate?.()?.toISOString() || snapshot.data().createdAt,
  };
};

export const getWeekendEvents = async () => {
  
  const now = new Date();
  const dayOfWeek = now.getDay(); 

  
  const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 5 + (7 - dayOfWeek);
  const friday = new Date(now);
  friday.setDate(now.getDate() + daysUntilFriday);
  friday.setHours(0, 0, 0, 0);

  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);
  sunday.setHours(23, 59, 59, 999);

  const q = query(
    eventsCollection,
    where('date', '>=', Timestamp.fromDate(friday)),
    where('date', '<=', Timestamp.fromDate(sunday)),
    orderBy('date', 'asc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date?.toDate?.()?.toISOString() || doc.data().date,
  }));
};
