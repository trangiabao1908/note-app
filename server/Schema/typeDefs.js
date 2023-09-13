export const typeDefs = `#graphql
  scalar Date
  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author
    notes: [Note]
  }
  type Author{
    uid: String!,
    name: String!,
    createdAt: String,
  }
  type Note{
   id: String!,
   content: String,
   updatedAt: Date,
  }
  type Query {
    folders: [Folder],
    folder(folderId: String!): Folder
    note(noteId: String!): Note
  }
  type Mutation {
    addFolder(name: String!): Folder
    register(name: String!, uid: String!): Author
    addNote(content: String!, folderId: ID!): Note
    updateNote(id: String!,content: String!): Note,
  }

`;
