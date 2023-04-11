import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, message, Card } from 'antd';
import {
  selectPosts,
  selectStatus,
  selectError,
  fetchPosts,
  deletePost,
  updatePost,
} from 'store/posts';
import { AppDispatch } from 'store';
import { EyeOutlined } from '@ant-design/icons';

import { Link, useNavigate } from 'react-router-dom';
import { selectAuth, UserRole } from 'store/auth';
import { IListingItemProps } from '.';

import './ListingItem.scss';

const ListingItem = ({ post, editable = false }: IListingItemProps) => {
  const user = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();

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
  //@ts-ignore
  const handleEdit = (post) => {
    Modal.confirm({
      title: 'Edit Post',
      content: (
        <Form
          name='editPostForm'
          initialValues={{
            title: post.title,
            description: post.description,
            price: post.price,
            type: post.type,
            location: post.location,
          }}
        >
          <Form.Item label='Title' name='title'>
            <Input />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input />
          </Form.Item>
          <Form.Item label='Price' name='price'>
            <Input />
          </Form.Item>
          <Form.Item label='Type' name='type'>
            <Input />
          </Form.Item>
          <Form.Item label='Location' name='location'>
            <Input />
          </Form.Item>
        </Form>
      ),
      onOk: () => {
        const updatedPost = {
          id: post.id,
          title: post.title,
          description: post.description,
          price: post.price,
          type: post.type,
          location: post.location,
        };
        //@ts-ignore
        dispatch(updatePost(updatedPost)).then(() => {
          message.success('Post updated successfully!');
        });
      },
    });
  };

  return (
    <Card
      key={post.id}
      style={{ width: 300, margin: '16px' }}
      className='ListingItem'
      cover={<img alt={post.title} src={post.images?.[0]} />}
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
          <Button type='primary' onClick={() => handleEdit(post)}>
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
    </Card>
  );
};

export default ListingItem;
