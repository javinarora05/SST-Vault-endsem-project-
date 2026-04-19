
import { useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import useRSVPStore from '../store/useRSVPStore';
import { onAuthChange } from '../services/authService';
import { getUserProfile, createUserProfile } from '../services/userService';

const useAuth = () => {
  const { setUser, setProfile, clearUser, setLoading } = useAuthStore();
  const { fetchUserRSVPs, clearRSVPs } = useRSVPStore();

  useEffect(() => {
    setLoading(true);

    
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });

        
        let profile = await getUserProfile(firebaseUser.uid);

        
        if (!profile) {
          await createUserProfile(firebaseUser.uid, {
            displayName: firebaseUser.displayName || 'User',
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL || '',
          });
          profile = await getUserProfile(firebaseUser.uid);
        }

        setProfile(profile);

        
        fetchUserRSVPs(firebaseUser.uid);
      } else {
        
        clearUser();
        clearRSVPs();
      }
    });

    
    return () => unsubscribe();
  }, []); 
};

export default useAuth;
