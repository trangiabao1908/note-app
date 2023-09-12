import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import { graphqlResquest } from '../utils/request';
export default function Login() {
   const auth = getAuth();
   const { user } = useContext(AuthContext);
   const handleLogin = async () => {
      const provider = new GoogleAuthProvider();

      const {
         user: { uid, displayName },
      } = await signInWithPopup(auth, provider);
      const query = `mutation Register($name: String!, $uid: String!) {
                     register(name: $name, uid: $uid) {
                        createdAt
                        name
                        uid
                     }
                     }`;
      const data = await graphqlResquest({
         query,
         variables: {
            uid: uid,
            name: displayName,
         },
      });
      console.log('resgister: ', data.register);
   };
   if (localStorage.getItem('access_token')) {
      return <Navigate to="/"></Navigate>;
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
