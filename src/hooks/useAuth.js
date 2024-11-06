import { useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(setUser);
  }, []);

  return { user };
};