import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createClient } from 'graphql-ws';
import { Badge, Menu, MenuItem } from '@mui/material';
const client = createClient({
   url: 'wss://note-app-clone-server-c4f8.onrender.com',
});
const query = `subscription Subscription {
  pushNotification {
    message
  }
}`;
export default function PushNotificationMenu() {
   const [invisible, setInvisible] = useState(true);
   const [notification, setNotification] = useState('');
   const [anchor, setAnchor] = useState(null);
   const [open, setOpen] = useState(false);
   const handleClose = () => {
      setAnchor(null);
      setOpen(!open);
      setNotification('');
      setInvisible(true);
   };
   const handleOpen = (e) => {
      if (notification) {
         setAnchor(e.currentTarget);
         setOpen(!open);
      }
   };

   useEffect(() => {
      // subscription
      (async () => {
         const onNext = (data) => {
            /* handle incoming values */
            const message = data?.data?.pushNotification?.message;
            setNotification(message);
            setInvisible(false);
            console.log('[PushNotification] ', { data });
         };

         await new Promise((resolve, reject) => {
            client.subscribe(
               {
                  query,
               },
               {
                  next: onNext,
                  error: reject,
                  complete: resolve,
               },
            );
         });
      })();
   }, []);
   return (
      <React.Fragment>
         <Badge color="secondary" variant="dot" invisible={invisible}>
            <NotificationsIcon onClick={handleOpen}></NotificationsIcon>
         </Badge>
         <Menu id="basic-menu" anchorEl={anchor} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>{notification}</MenuItem>
         </Menu>
      </React.Fragment>
   );
}
