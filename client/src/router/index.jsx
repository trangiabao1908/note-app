import { Outlet, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import AuthProvider from '../context/AuthProvider';
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

      children: [
         {
            element: <Login />,
            path: '/login',
         },
         {
            element: <Home />,
            path: '/',
         },
      ],
   },
]);
export default router;
