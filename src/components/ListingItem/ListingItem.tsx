import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, message, Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import { deletePost } from 'store/posts';
import { AppDispatch } from 'store';
import PostModal from 'components/PostModal';

import { IListingItemProps } from '.';

import './ListingItem.scss';

const ListingItem = ({ post, editable = false }: IListingItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isEditPostModalVisible, setIsEditPostModalVisible] =
    useState<boolean>(false);

  const handleDetailPageNavigation = () => {
    navigate(`/detail/${post.id}`);
  };

  const handleDelete = (postId: number) => {
    Modal.confirm({
      title: 'Delete Post',
      content: 'Are you sure you want to delete this post?',
      onOk: () => {
        dispatch(deletePost(postId));
      },
    });
  };

  const handleEditPostModalVisibility = () => {
    setIsEditPostModalVisible(!isEditPostModalVisible);
  };

  return (
    <Card
      key={post.id}
      className='ListingItem'
      cover={
        <img
          alt={post.title}
          src={
            post.images?.[0]?.base64 ??
            'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
          }
        />
      }
    >
      <Button
        type='default'
        className='ListingItem__viewDetailButton'
        shape='circle'
        onClick={handleDetailPageNavigation}
        icon={<EyeOutlined />}
      />
      <Card.Meta
        title={post.title ? post.title : 'No title'}
        description={post.description ? post.description : 'No description'}
        className='ListingItem__content'
      />
      <p>Price: {post.price}</p>
      <p>Type: {post.type}</p>
      <p>Location: {post.location ? post.location : 'No location'}</p>
      <p>Listing Type: {post.listingType}</p>
      {editable && (
        <div className='ListingItem__content__actionButtons'>
          <Button type='primary' onClick={handleEditPostModalVisibility}>
            Edit
          </Button>
          <Button
            type='default'
            className='ListingItem__content__actionButtons__deleteButton'
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </Button>
        </div>
      )}
      {isEditPostModalVisible && (
        <PostModal
          visible={isEditPostModalVisible}
          post={post}
          onCancel={handleEditPostModalVisibility}
        />
      )}
    </Card>
  );
};

export default ListingItem;
