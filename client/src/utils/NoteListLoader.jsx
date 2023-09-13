import { graphqlResquest } from './request.js';
export const NoteListLoader = async ({ params }) => {
   const folderId = params.folderId;
   const query = `query Folder($folderId: String!) {
                           folder(folderId: $folderId) {
                              id
                              name
                              notes {
                                 id
                                 content
                                 updatedAt
                              }
                           }
                           }`;
   const data = await graphqlResquest({
      query,
      variables: {
         folderId,
      },
   });
   return data;
};

// eslint-disable-next-line react-refresh/only-export-components
export const addNewNote = async ({ request }) => {
   const newNote = await request.formData();
   const formDataObject = {};
   newNote.forEach((value, key) => (formDataObject[key] = value));
   console.log({ newNote, formDataObject });

   const query = `mutation Mutation($content: String!, $folderId: ID!) {
                  addNote(content: $content, folderId: $folderId) {
                     content
                     id
                  }
                  }`;

   const data = await graphqlResquest({ query, variables: formDataObject });
   console.log(data);
   return data;
};
