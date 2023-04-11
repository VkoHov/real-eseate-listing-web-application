import React from 'react';

const Login = React.lazy(
  () => import(/* webpackChunkName: "Login" */ '../pages/Login/Login'),
);

const SignUp = React.lazy(
  () => import(/* webpackChunkName: "SignUp" */ '../pages/SignUp/SignUp'),
);

const ListingPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ListingPage" */ '../pages/ListingPage/ListingPage'
    ),
);

const DetailPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "DetailPage" */ '../pages/DetailPage/DetailPage'
    ),
);

const AdminListingPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "AdminListingPage" */ '../pages/AdminListingPage/AdminListingPage'
    ),
);

const routes = {
  LISTINGPAGE: {
    path: '/',
    component: ListingPage,
  },
  ADMINLISTINGPAGE: {
    path: '/admin',
    component: AdminListingPage,
  },
  DETAIL: {
    path: '/detail/:postId',
    component: DetailPage,
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
