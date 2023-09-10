export const FoldersLoader = async () => {
   const query = `query Folders {
                                    folders {
                                       name
                                       id
                                       createdAt
                                    }
                                    }`;
   const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         query,
      }),
   });

   const { data } = await res.json();
   return data;
};
