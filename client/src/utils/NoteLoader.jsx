import { graphqlResquest } from './request.js';
export const NoteLoader = async ({ params }) => {
   const noteId = params.noteId;
   const query = `query Note($noteId: String!) {
                    note(noteId: $noteId) {
                        content
                        id
                        updatedAt
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

// eslint-disable-next-line react-refresh/only-export-components
export const updateNote = async ({ request }) => {
   const updatedNote = await request.formData();
   const formDataObject = {};
   updatedNote.forEach((value, key) => (formDataObject[key] = value));
   // console.log({ updatedNote, formDataObject });
   const query = `mutation Mutation($id: String!, $content: String!) {
  updateNote(id: $id, content: $content) {
    content
    id
  }
}`;
   const data = await graphqlResquest({ query, variables: formDataObject });
   // console.log({ data });
   return data;
};
