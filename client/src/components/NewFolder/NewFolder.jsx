import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   IconButton,
   TextField,
   Tooltip,
} from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
('@mui/icons-material');
import { addnewfolder } from '../../utils/AddNewFolder';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function NewFolder() {
   const [open, setOpen] = useState(false);
   const [newFoldername, setNewFolderName] = useState('');
   const [searchParams, setSearchParams] = useSearchParams();
   const Popupname = searchParams.get('popup');
   const navigate = useNavigate();
   const handleOpenPopup = () => {
      setSearchParams({ popup: 'add-new-folder' });
   };
   const handleClose = () => {
      setNewFolderName('');
      navigate(-1);
   };
   const handleAddNewFolder = async () => {
      if (newFoldername != '') {
         const { addFolder } = await addnewfolder(newFoldername);
         console.log('AddNewFolder: ', addFolder);
      }
      handleClose();
   };
   const handleSetNewFolderName = (e) => {
      setNewFolderName(e.target.value);
   };
   useEffect(() => {
      if (Popupname === 'add-new-folder') {
         setOpen(true);
      } else {
         setOpen(false);
      }
   }, [Popupname]);
   return (
      <React.Fragment>
         <Tooltip title="Add New Folder" onClick={handleOpenPopup}>
            <IconButton size="small">
               <CreateNewFolderOutlinedIcon sx={{ color: 'white' }}></CreateNewFolderOutlinedIcon>
            </IconButton>
         </Tooltip>
         <Dialog open={open}>
            <DialogTitle>New Folder</DialogTitle>
            <DialogContent>
               <TextField
                  autoComplete="off"
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Folder name"
                  fullWidth
                  variant="standard"
                  sx={{ width: '400px' }}
                  value={newFoldername}
                  onChange={handleSetNewFolderName}
               ></TextField>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Close</Button>
               <Button onClick={handleAddNewFolder}>Add</Button>
            </DialogActions>
         </Dialog>
      </React.Fragment>
   );
}
