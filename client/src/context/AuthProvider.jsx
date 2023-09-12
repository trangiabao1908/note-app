import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();
   const [user, setUser] = useState({});
   const auth = getAuth();
   useEffect(() => {
      const unsubscribed = auth.onIdTokenChanged((user) => {
         console.log({ user });
         if (user?.uid) {
            setUser(user);
            if (user.accessToken !== localStorage.getItem('access_token')) {
               localStorage.setItem('access_token', user.accessToken);
               window.location.reload();
            }
            setIsLoading(false);
            return;
         }

         setIsLoading(false);
         setUser({});
         localStorage.clear();
         navigate('/login');
      });
      return () => {
         unsubscribed();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [auth]);

   return (
      <AuthContext.Provider value={{ user, setUser }}>
         {isLoading ? <CircularProgress /> : children}
      </AuthContext.Provider>
   );
}
