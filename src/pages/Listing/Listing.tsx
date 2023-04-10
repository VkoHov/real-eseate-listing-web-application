import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import {
  selectPosts,
  selectStatus,
  selectError,
  fetchPosts,
  deletePost,
  updatePost,
} from 'store/posts';
import { AppDispatch } from 'store';

import { useNavigate } from 'react-router-dom';
import { selectAuth } from 'store/auth';

import { IListingProps } from '.';

const Listing = (props: IListingProps) => {
  const user = useSelector(selectAuth);
  const navigate = useNavigate();
  const posts = useSelector(selectPosts);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  React.useEffect(() => {
    // if (!user.name) {
    //   navigate('/login');
    // }
  }, [user]);

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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Actions',
      key: 'actions',
      //@ts-ignore
      render: (_, post) => (
        <>
          <Button type='primary' onClick={() => handleEdit(post)}>
            Edit
          </Button>
          <Button type='primary' onClick={() => handleDelete(post.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Table
      dataSource={posts}
      columns={columns}
      rowKey='id'
      pagination={false}
    />
  );
};

export default Listing;
