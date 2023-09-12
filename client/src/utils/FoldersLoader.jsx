import { graphqlResquest } from './request.js';
export const FoldersLoader = async () => {
   const query = `query Folders {
                                    folders {
                                       name
                                       id
                                       createdAt
                                        notes {
                                                id
                                                content
                                             }
                                    }
                                    }`;

   const data = await graphqlResquest({ query });
   return data;
};
