import React from 'react';

const Listing = React.lazy(
  () => import(/* webpackChunkName: "listing" */ '../pages/Listing/Listing'),
);

const routes = {
  LISTING: {
    path: '/',
    component: Listing,
  },
};

export default routes;
