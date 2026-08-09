import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthState {
  user: User | null;
  loading: boolean;
}

// Custom hook to subscribe to Firebase Auth state changes.
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({ user, loading: false });
    });
    return unsubscribe; // cleanup on unmount
  }, []);

  return state;
}
