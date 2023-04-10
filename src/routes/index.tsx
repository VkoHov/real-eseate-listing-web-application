import React from 'react';

const Listing = React.lazy(
  () => import(/* webpackChunkName: "listing" */ '../pages/Listing/Listing'),
);
const Login = React.lazy(
  () => import(/* webpackChunkName: "Login" */ '../pages/Login/Login'),
);
const SignUp = React.lazy(
  () => import(/* webpackChunkName: "SignUp" */ '../pages/SignUp/SignUp'),
);

const routes = {
  LISTING: {
    path: '/',
    component: Listing,
  },
  LOGIN: {
    path: '/login',
    component: Login,
  },
  SIGNUP: {
    path: '/signup',
    component: SignUp,
  },
};

export default routes;
