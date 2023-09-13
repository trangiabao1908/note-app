import { Box, Card, CardContent, Grid, IconButton, List, Tooltip, Typography } from '@mui/material';
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useSubmit, useNavigate } from 'react-router-dom';
import moment from 'moment';
export default function NoteList() {
   const { noteId, folderId } = useParams();
   const [noteID, setNoteID] = useState(noteId);
   const data = useLoaderData();
   let submit = useSubmit();
   const navigate = useNavigate();
   const folder = data.folder;
   const handleChangeNoteId = (noteId) => {
      setNoteID(noteId);
   };
   useEffect(() => {
      if (noteId) {
         setNoteID(noteId);
         return;
      }
      if (folder?.notes?.[0]) {
         navigate(`note/${folder.notes[0].id}`);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [noteId, folder.notes]);
   // console.log('folder: ', folder);
   const handleAddNewNote = () => {
      submit(
         {
            content: '',
            folderId: folderId,
         },
         { method: 'POST', action: `/folders/${folderId}` },
      );
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
                     <Tooltip title="Add New Note" onClick={handleAddNewNote}>
                        <IconButton size="small">
                           <NoteAddIcon></NoteAddIcon>
                        </IconButton>
                     </Tooltip>
                  </Box>
               }
            >
               {folder.notes.map(({ id, content, updatedAt }) => {
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
                              <Typography sx={{ fontSize: '10px' }}>
                                 {moment(updatedAt).format('MMM Do YYYY, h:mm:ss a')}
                              </Typography>
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
