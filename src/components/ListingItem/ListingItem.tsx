import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, message, Card } from 'antd';
import { deletePost } from 'store/posts';
import { AppDispatch } from 'store';
import { EyeOutlined } from '@ant-design/icons';

import PostModal from 'components/PostModal';

import { selectAuth } from 'store/auth';
import { IListingItemProps } from '.';

import './ListingItem.scss';

const ListingItem = ({ post, editable = false }: IListingItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditPostModalVisible, setIsEditPostModalVisible] =
    useState<boolean>(false);

  const handleDelete = (postId: number) => {
    Modal.confirm({
      title: 'Delete Post',
      content: 'Are you sure you want to delete this post?',
      onOk: () => {
        dispatch(deletePost(postId)).then(() => {
          message.success('Post deleted successfully!');
        });
      },
    });
  };

  const handleEditPostModalVisibility = () => {
    setIsEditPostModalVisible(!isEditPostModalVisible);
  };

  return (
    <Card
      key={post.id}
      style={{ width: 300, margin: '16px' }}
      className='ListingItem'
      cover={<img alt={post.title} src={post.images?.[0].base64} />}
    >
      <Button
        type='default'
        className='ListingItem__viewDetailButton'
        shape='circle'
        icon={<EyeOutlined />}
      />
      <Card.Meta
        title={post.title}
        description={post.description}
        className='ListingItem__content'
      />
      <p>Price: {post.price}</p>
      <p>Type: {post.type}</p>
      <p>Location: {post.location}</p>
      {editable && (
        <>
          <Button type='primary' onClick={handleEditPostModalVisibility}>
            Edit
          </Button>
          <Button
            type='primary'
            onClick={() => handleDelete(post.id)}
            style={{ marginLeft: '8px' }}
          >
            Delete
          </Button>
        </>
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
