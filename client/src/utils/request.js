import { GRAPHQL_SERVER } from './constants';
export const graphqlResquest = async (payload, options = {}) => {
   if (localStorage.getItem('access_token')) {
      const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            ...options,
         },
         body: JSON.stringify(payload),
      });
      if (!res.ok) {
         if (res.status === 403) {
            return null;
         }
      }
      const { data } = await res.json();
      console.log({ data });
      return data;
   }
   return null;
};
