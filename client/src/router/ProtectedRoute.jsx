import { Outlet, useNavigate } from 'react-router-dom';

export default function ProtectedRoute() {
   const navigate = useNavigate();
   if (!localStorage.getItem('access_token')) {
      navigate('/login');
      return;
   }
   return <Outlet />;
}
