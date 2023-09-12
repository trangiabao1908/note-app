import { graphqlResquest } from './request.js';
export const addnewfolder = async (nameFolder) => {
   const query = `mutation AddFolder($name: String!) {
                    addFolder(name: $name) {
                        author {
                        name
                        }
                        name
                    }
                    }
    `;
   const variables = {
      name: nameFolder,
   };
   const data = await graphqlResquest({ query, variables });
   return data;
};
