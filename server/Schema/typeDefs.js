export const typeDefs = `#graphql
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
  }
  type Query {
    folders: [Folder],
    folder(folderId: String!): Folder
    note(noteId: String): Note
  }
  type Mutation {
    addFolder(name: String!): Folder
    register(name: String!, uid: String!): Author
  }

`;
