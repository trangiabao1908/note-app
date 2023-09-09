import { useRouteError } from 'react-router-dom';

export default function ErrorLayout() {
   const error = useRouteError();
   console.error(error);
   return (
      <div>
         <h1>Oops!</h1>
         <p>Sorry, an unexpected error has occurred</p>
         <p>
            <i>{error.message || error.statusText}</i>
         </p>
      </div>
   );
}
