import './style/global.css';

import { RouterProvider } from 'react-router-dom';

import { router } from './router';

export const App = () => {
  return <RouterProvider router={router} />;
};
