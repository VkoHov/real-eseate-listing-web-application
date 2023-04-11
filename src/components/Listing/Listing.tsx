import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isNil } from 'lodash-es';

import { selectPosts, fetchPosts } from 'store/posts';
import { AppDispatch } from 'store';
import ListingItem from 'components/ListingItem';
import { IListingProps } from '.';

import './Listing.scss';

const Listing = ({ userId }: IListingProps) => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts({ userId }));
  }, []);

  return (
    <div className='Listing'>
      {posts.map((post) => (
        <ListingItem post={post} key={post.id} editable={!isNil(userId)} />
      ))}
    </div>
  );
};

export default Listing;
