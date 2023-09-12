/* eslint-disable react/prop-types */
import { Box, Card, CardContent, List, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NewFolder from '../NewFolder/NewFolder';
export default function FolderList({ folders }) {
   const { folderId } = useParams();
   const [folderID, setfolderID] = useState(folderId);
   const handleChangeFolderId = (folderId) => {
      setfolderID(folderId);
   };
   return (
      <List
         sx={{
            width: '100%',
            bgcolor: '#7D9D9C',
            height: '100%',
            padding: '10px',
            textAlign: 'left',
            overflowY: 'auto',
         }}
         subheader={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <Typography sx={{ fontWeight: 'bold', color: 'white' }}>Folders</Typography>
               <NewFolder></NewFolder>
            </Box>
         }
      >
         {folders.map(({ id, name }) => {
            return (
               <Link
                  onClick={() => handleChangeFolderId(id)}
                  key={id}
                  to={`folders/${id}`}
                  style={{ textDecoration: 'none' }}
               >
                  <Card sx={{ mb: '5px', bgcolor: id === folderID ? 'rgb(255 211 140)' : null }}>
                     <CardContent sx={{ '&:last-child': { padding: '10px' }, padding: '10px' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
                     </CardContent>
                  </Card>
               </Link>
            );
         })}
      </List>
   );
}
