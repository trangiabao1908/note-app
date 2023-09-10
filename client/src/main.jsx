import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './router';
import '@fontsource/roboto'; // Defaults to weight 400
import '@fontsource/roboto/400.css'; // Specify weight
import '@fontsource/roboto/400-italic.css'; // Specify weight and style
import { Container } from '@mui/material';
import './firebase/config';
ReactDOM.createRoot(document.getElementById('root')).render(
   <Container maxWidth="lg" sx={{ textAlign: 'center', marginTop: '50px' }}>
      <RouterProvider router={router} />
   </Container>,
);
