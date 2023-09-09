import { Outlet, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import AuthProvider from '../context/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import ErrorLayout from './ErrorLayout';
const AuthLayout = () => {
   return (
      <AuthProvider>
         <Outlet />
      </AuthProvider>
   );
};
const router = createBrowserRouter([
   {
      element: <AuthLayout />,
      errorElement: <ErrorLayout></ErrorLayout>,
      children: [
         {
            element: <Login />,
            path: '/login',
         },
         {
            element: <ProtectedRoute />,
            children: [
               {
                  element: <Home />,
                  path: '/',
               },
            ],
         },
      ],
   },
]);
export default router;
