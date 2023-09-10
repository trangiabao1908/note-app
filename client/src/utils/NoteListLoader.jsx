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
   const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         query,
         variables: {
            folderId,
         },
      }),
   });
   const { data } = await res.json();

   return data;
};
