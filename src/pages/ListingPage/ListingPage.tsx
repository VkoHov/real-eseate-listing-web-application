import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isNil } from 'lodash-es';

import Listing from 'components/Listing';
import { selectAuth } from 'store/auth';

import './ListingPage.scss';

const ListingPage = () => {
  const user = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isNil(user.id)) {
      navigate('/login');
    }
  });

  return (
    <div className='ListingPage'>
      <Listing />
    </div>
  );
};

export default ListingPage;
