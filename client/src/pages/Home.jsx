import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UserMenu from '../components/UserMenu/UserMenu';
import FolderList from '../components/FolderList/FolderList';
import { Outlet } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import PushNotificationMenu from '../components/PushNotificationMenu/PushNotificationMenu';
export default function Home() {
   const data = useLoaderData();
   return (
      <React.Fragment>
         <Typography variant="h4" sx={{ mb: '25px' }}>
            Note App
         </Typography>
         <Box sx={{ display: 'flex', justifyContent: 'right', mb: '15px', alignItems: 'center' }}>
            <UserMenu></UserMenu>
            <PushNotificationMenu></PushNotificationMenu>
         </Box>

         <Grid
            container
            sx={{ height: '50vh', boxShadow: '0 0 15px 0 rgb(193 193 193 / 60%)' }}
            style={{ userSelect: 'none' }}
         >
            <Grid item xs={3} sx={{ height: '100%' }}>
               <FolderList folders={data.folders}></FolderList>
            </Grid>
            <Grid item xs={9} sx={{ height: '100%' }}>
               <Outlet></Outlet>
            </Grid>
         </Grid>
      </React.Fragment>
   );
}
