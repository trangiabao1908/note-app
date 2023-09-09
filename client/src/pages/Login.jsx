import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Login() {
   const auth = getAuth();
   const navigate = useNavigate();
   const { user } = useContext(AuthContext);
   const handleLogin = async () => {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      console.log(res);
   };
   if (user?.uid) {
      navigate('/');
      return;
   }
   return (
      <>
         <Typography sx={{ marginBottom: '10px' }} variant="h5">
            Welcome to Note App
         </Typography>
         <Button variant="outlined" onClick={handleLogin}>
            Login With Google
         </Button>
      </>
   );
}
