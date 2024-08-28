import { RoutingRoot } from '@components';
import { Landing, NotFound } from '@routes';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RoutingRoot />,
    children: [
      {
        path: '',
        element: <Landing />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
