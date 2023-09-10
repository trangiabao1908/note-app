import { Schema } from 'mongoose';
import fakeData from '../fakeData/index.js';
import { FolderModel } from '../models/index.js';
export const resolvers = {
   Query: {
      folders: async () => {
         const folder = await FolderModel.find();

         return folder;
         // return fakeData.folders;
      },
      folder: async (parent, args) => {
         const folderId = args.folderId;
         const folder = await FolderModel.findOne({ _id: `${folderId}` });

         return folder;
      },
      note: (parent, args) => {
         const noteId = args.noteId;
         return fakeData.notes.find((note) => note.id === noteId);
      },
   },
   Folder: {
      author: (parent, args) => {
         console.log({ parent, args });
         const authorId = parent.authorId;
         return fakeData.authors.find((author) => author.id === authorId);
      },
      notes: (parent, args) => {
         const folderId = parent.id;
         return fakeData.notes.filter((note) => note.folderId == folderId);
      },
   },
   Mutation: {
      addFolder: async (parent, args) => {
         const newFolder = new FolderModel({ ...args, authorId: '123' });
         await newFolder.save();
         return newFolder;
      },
   },
};
