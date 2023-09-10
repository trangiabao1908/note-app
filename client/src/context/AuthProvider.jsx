import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
   const navigate = useNavigate();
   const [user, setUser] = useState({});
   const auth = getAuth();
   useEffect(() => {
      const unsubscribed = auth.onIdTokenChanged((user) => {
         console.log({ user });
         if (user?.uid) {
            setUser(user);
            localStorage.setItem('access_token', user.accessToken);
            return;
         }

         setUser({});
         localStorage.clear();
         navigate('/login');
      });
      return () => {
         unsubscribed();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [auth]);

   return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
