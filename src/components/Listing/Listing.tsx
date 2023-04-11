import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isNil, isEmpty } from 'lodash-es';
import { Empty } from 'antd';

import { selectPosts, fetchPosts } from 'store/posts';
import { AppDispatch } from 'store';
import ListingItem from 'components/ListingItem';
import SearchPosts, { SearchParams } from 'components/SearchPosts';
import { generateQueryFromParams } from 'components/SearchPosts/helper';
import { IListingProps } from '.';

import './Listing.scss';

const Listing = ({ userId }: IListingProps) => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const queryParams = userId ? `?userId=${userId}` : '';

    dispatch(fetchPosts(queryParams));
  }, []);

  const handleSearch = (searchParams: SearchParams) => {
    const queryParams = userId ? `?userId=${userId}&` : '?';
    dispatch(fetchPosts(queryParams + generateQueryFromParams(searchParams)));
  };

  return (
    <div className='Listing'>
      <SearchPosts onSearch={handleSearch} />
      <div className='Listing__itemsWrapper'>
        {!isEmpty(posts) ? (
          posts.map((post) => (
            <ListingItem post={post} key={post.id} editable={!isNil(userId)} />
          ))
        ) : (
          <div className='Listing__emptyBox'>
            <Empty description='No posts yet' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;
