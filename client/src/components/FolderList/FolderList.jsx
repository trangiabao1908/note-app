/* eslint-disable react/prop-types */
import { Card, CardContent, List, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
         subheader={<Typography sx={{ fontWeight: 'bold', color: 'white' }}>Folders</Typography>}
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
                        <Typography>{name}</Typography>
                     </CardContent>
                  </Card>
               </Link>
            );
         })}
      </List>
   );
}
