import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UserMenu from '../components/UserMenu/UserMenu';
export default function Home() {
   return (
      <React.Fragment>
         <Typography variant="h4" sx={{ mb: '25px' }}>
            Note App
         </Typography>
         <Box sx={{ display: 'flex', justifyContent: 'right', mb: '15px' }}>
            <UserMenu></UserMenu>
         </Box>

         <Grid container sx={{ height: '50vh', boxShadow: '0 0 15px 0 rgb(193 193 193 / 60%)' }}>
            <Grid item xs={3} sx={{ height: '100%' }}>
               <Typography variant="h5">Folder List</Typography>
            </Grid>
            <Grid item xs={9} sx={{ height: '100%' }}>
               <Typography variant="h5">Note List</Typography>
            </Grid>
         </Grid>
      </React.Fragment>
   );
}
