import { Outlet } from 'react-router-dom';

export const RoutingRoot = () => {
  return (
    <>
      {/*<Navbar />*/}
      {/*<OtherComponentThatShouldAlwaysBeVisible />*/}
      <Outlet />
    </>
  );
};
