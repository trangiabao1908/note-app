import { graphqlResquest } from './request.js';
export const NoteListLoader = async ({ params }) => {
   const folderId = params.folderId;
   const query = `query Folder($folderId: String) {
                           folder(folderId: $folderId) {
                              id
                              name
                              notes {
                                 id
                                 content
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
