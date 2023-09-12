import { graphqlResquest } from './request.js';
export const NoteLoader = async ({ params }) => {
   const noteId = params.noteId;
   const query = `query Note($noteId: String) {
                    note(noteId: $noteId) {
                        content
                        id
                    }
                    }`;
   const data = await graphqlResquest({
      query,
      variables: {
         noteId,
      },
   });
   return data;
};
