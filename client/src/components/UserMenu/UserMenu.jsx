import { Avatar, Box, MenuItem, Menu, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { getAuth } from 'firebase/auth';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import React from 'react';
export default function UserMenu() {
   const auth = getAuth();
   const { user } = useContext(AuthContext);
   const [anchor, setAnchor] = useState(null);
   const [open, setOpen] = useState(false);
   const handleLogout = () => {
      auth.signOut();
   };
   const handleClose = () => {
      setAnchor(null);
      setOpen(!open);
   };
   const handleOpemLogout = (e) => {
      setAnchor(e.currentTarget);
      setOpen(!open);
   };

   return (
      <React.Fragment>
         <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleOpemLogout}>
            <Typography>{user.displayName}</Typography>
            <Avatar alt="" src={user.photoURL} sx={{ width: '26px', height: '26px', ml: '5px' }}></Avatar>
         </Box>
         <Menu id="basic-menu" anchorEl={anchor} open={open} onClose={handleClose}>
            <MenuItem onClick={handleLogout}>
               <ListItemIcon>
                  <Logout fontSize="small" />
               </ListItemIcon>
               Logout
            </MenuItem>
         </Menu>
      </React.Fragment>
   );
}
