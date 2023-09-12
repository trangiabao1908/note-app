import { Schema } from 'mongoose';
import fakeData from '../fakeData/index.js';
import { AuthorModel, FolderModel } from '../models/index.js';
export const resolvers = {
   Query: {
      folders: async (parent, args, context) => {
         const folder = await FolderModel.find({ authorId: context.uid });
         console.log(context.uid);
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
      author: async (parent, args) => {
         console.log({ parent, args });
         const authorId = parent.authorId;
         const foundAuthor = await AuthorModel.findOne({ uid: `${authorId}` });
         return foundAuthor;
      },
      notes: (parent, args) => {
         const folderId = parent.id;
         return fakeData.notes.filter((note) => note.folderId == folderId);
      },
   },
   Mutation: {
      addFolder: async (parent, args, context) => {
         const newFolder = new FolderModel({ ...args, authorId: context.uid });
         await newFolder.save();
         return newFolder;
      },
      register: async (parent, args) => {
         const findAuthor = await AuthorModel.findOne({ uid: args.uid });
         if (!findAuthor) {
            const newAuthor = new AuthorModel(args);
            await newAuthor.save();
            return newAuthor;
         }
         return findAuthor;
      },
   },
};
