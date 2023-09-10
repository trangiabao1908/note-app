import { Box, Card, CardContent, Grid, List, Typography } from '@mui/material';
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom';
import { useState } from 'react';
export default function NoteList() {
   const { noteId } = useParams();
   const [noteID, setNoteID] = useState(noteId);
   const data = useLoaderData();

   const folder = data.folder;
   const handleChangeNoteId = (noteId) => {
      setNoteID(noteId);
   };
   return (
      <Grid container height="100%">
         <Grid
            item
            xs={4}
            sx={{
               width: '100%',
               maxWidth: 360,
               bgcolor: '#F0EBE3',
               height: '100%',
               overflowY: 'auto',
               padding: '10px',
               textAlign: 'left',
            }}
         >
            <List
               subheader={
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                     }}
                  >
                     <Typography sx={{ fontWeight: 'bold' }}>Notes</Typography>
                  </Box>
               }
            >
               {folder.notes.map(({ id, content }) => {
                  return (
                     <Link
                        onClick={() => handleChangeNoteId(id)}
                        key={id}
                        to={`note/${id}`}
                        style={{ textDecoration: 'none' }}
                     >
                        <Card
                           sx={{
                              mb: '5px',
                              bgcolor: id === noteID ? 'rgb(255 211 140)' : null,
                           }}
                        >
                           <CardContent sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}>
                              <div
                                 style={{ fontSize: 14, fontWeight: 'bold' }}
                                 dangerouslySetInnerHTML={{
                                    __html: `${content.substring(0, 30) || 'Empty'}`,
                                 }}
                              />
                           </CardContent>
                        </Card>
                     </Link>
                  );
               })}
            </List>
         </Grid>
         <Grid item xs={8}>
            <Outlet></Outlet>
         </Grid>
      </Grid>
   );
}
