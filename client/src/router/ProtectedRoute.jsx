import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
   if (!localStorage.getItem('access_token')) {
      return <Navigate to={'/login'}></Navigate>;
   }
   return <Outlet />;
}
