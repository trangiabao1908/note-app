import { AuthorModel, FolderModel, NoteModel, NotificationModel } from '../models/index.js';
import { GraphQLScalarType } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers = {
   Date: new GraphQLScalarType({
      name: 'Date',
      parseValue(value) {
         return new Date(value);
      },
      serialize(value) {
         return value.toISOString();
      },
   }),

   Query: {
      folders: async (parent, args, context) => {
         const folder = await FolderModel.find({ authorId: context.uid }).sort({ updatedAt: 'desc' });
         console.log(context.uid);
         return folder;
         // return fakeData.folders;
      },
      folder: async (parent, args) => {
         const folderId = args.folderId;
         const folder = await FolderModel.findOne({ _id: `${folderId}` });

         return folder;
      },
      note: async (parent, args) => {
         const noteId = args.noteId;
         const foundNote = await NoteModel.findById(noteId);
         return foundNote;
      },
   },
   Folder: {
      author: async (parent, args) => {
         console.log({ parent, args });
         const authorId = parent.authorId;
         const foundAuthor = await AuthorModel.findOne({ uid: `${authorId}` });
         return foundAuthor;
      },
      notes: async (parent, args) => {
         const folderId = parent.id;
         const notes = await NoteModel.find({ folderId: parent.id }).sort({ updatedAt: 'desc' });
         return notes;
      },
   },
   Mutation: {
      addFolder: async (parent, args, context) => {
         const newFolder = new FolderModel({ ...args, authorId: context.uid });
         pubsub.publish('FOLDER_CREATED', {
            folderCreated: {
               message: 'A new folder created',
            },
         });
         await newFolder.save();
         return newFolder;
      },
      addNote: async (parent, args, context) => {
         const newNote = new NoteModel(args);

         await newNote.save();
         return newNote;
      },
      updateNote: async (parent, args) => {
         const note = await NoteModel.findByIdAndUpdate(args.id, args);
         return note;
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
      pushNotification: async (parent, args) => {
         const notification = new NotificationModel(args);
         pubsub.publish('PUSH_NOTIFICATION', {
            pushNotification: {
               message: args.content,
            },
         });
         notification.save();
         return { message: 'SUCCESS' };
      },
   },
   Subscription: {
      folderCreated: {
         subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED']),
      },
      pushNotification: {
         subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION']),
      },
   },
};
