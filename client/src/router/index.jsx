import { Outlet, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import AuthProvider from '../context/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import ErrorLayout from './ErrorLayout';
import NoteList from '../components/NoteList/NoteList';
import Note from '../components/Note/Note';
import { NoteListLoader } from '../utils/NoteListLoader';
import { FoldersLoader } from '../utils/FoldersLoader';
import { NoteLoader } from '../utils/NoteLoader';
import { addNewNote } from '../utils/NoteListLoader';
import { updateNote } from '../utils/NoteLoader';
// eslint-disable-next-line react-refresh/only-export-components
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
                  loader: FoldersLoader,
                  children: [
                     {
                        element: <NoteList></NoteList>,
                        path: 'folders/:folderId',
                        loader: NoteListLoader,
                        action: addNewNote,
                        children: [
                           {
                              element: <Note />,
                              loader: NoteLoader,
                              action: updateNote,
                              path: 'note/:noteId',
                           },
                        ],
                     },
                  ],
               },
            ],
         },
      ],
   },
]);
export default router;
