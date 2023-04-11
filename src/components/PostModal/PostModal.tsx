import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize, noop } from 'lodash-es';
import { Modal, Form, Input, InputNumber, Button, message, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { PropertyType } from 'constants/post';
import { selectAuth, UserData } from 'store/auth';
import { createPost, updatePost } from 'store/posts';
import { AppDispatch } from 'store';
import { IPostModalProps, Image } from '.';

import './PostModal.scss';

const { Option } = Select;

const PostModal = ({ visible, post, onCancel = noop }: IPostModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectAuth);
  const [type, setType] = useState<string>(
    post?.type ?? PropertyType.APARTMENT,
  );
  const [title, setTitle] = useState<string>(post?.title ?? '');
  const [description, setDescription] = useState<string>(
    post?.description ?? '',
  );
  const [price, setPrice] = useState<number>(post?.price ?? 0);
  const [location, setLocation] = useState<string>(post?.location ?? '');
  const [imageList, setImageList] = useState<Image[]>(post?.images ?? []);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (post) {
        dispatch(
          updatePost({
            title,
            description,
            price,
            type,
            location,
            images: imageList,
            userId: user.id ?? 0,
            id: post.id,
          }),
        );
      } else {
        // Call createListing action with new post values
        dispatch(
          createPost({
            title,
            description,
            price,
            type,
            location,
            images: imageList,
            userId: user.id ?? 0,
          }),
        );
      }
      handleCancel();
    } catch (error) {
      console.error('Failed to create/update post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Read each uploaded file as base64
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          // Update image list with base64 image data
          setImageList([
            ...imageList,
            { name: file.name, base64: base64Image },
          ]);
          message.success(`${file.name} uploaded successfully`);
        };
      });
    }
  };

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: number | null) => {
    setPrice(event ?? 0);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleImageDelete = (image: Image) => {
    setImageList(imageList.filter((img) => img.base64 !== image.base64));
  };

  return (
    <Modal
      open={visible}
      title={post ? 'Edit Post' : 'Create Post'}
      onCancel={handleCancel}
      className='PostModal'
      footer={[
        <Button key='cancel' onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={handleSubmit}
          loading={loading}
        >
          {post ? 'Update' : 'Create'}
        </Button>,
      ]}
    >
      <Form layout='vertical' className='PostModal__form'>
        <Form.Item label='Title' name='title'>
          <Input
            value={title}
            onChange={handleTitleChange}
            defaultValue={title}
          />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input.TextArea
            rows={4}
            value={description}
            defaultValue={description}
            onChange={handleDescriptionChange}
          />
        </Form.Item>
        <Form.Item label='Price' name='price'>
          <InputNumber
            className='PostModal__form__priceField'
            min={0}
            onChange={handlePriceChange}
            value={price}
            defaultValue={price}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label='Select' name='propertyType'>
          <Select onChange={handleTypeChange} value={type} defaultValue={type}>
            {Object.values(PropertyType).map((value) => (
              <Option value={value} key={value}>
                {capitalize(value)}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Location' name='location'>
          <Input
            onChange={handleLocationChange}
            value={location}
            defaultValue={location}
          />
        </Form.Item>
        <Form.Item label='Images' name='images'>
          <div className='PostModal__form__imagesFiled'>
            <div className='PostModal__form__imagesFiled__uploadImageButton'>
              <label htmlFor='uploadInput' className='ant-btn ant-btn-primary'>
                <span>Upload +</span>
              </label>
              <input
                id='uploadInput'
                type='file'
                accept='image/*'
                onChange={handleUploadChange}
                style={{ display: 'none' }}
              />
            </div>
            {imageList.map((image, index) => (
              <div
                key={index}
                className='PostModal__form__imagesFiled__imageBox'
              >
                <Button
                  type='default'
                  shape='circle'
                  size='small'
                  icon={<CloseOutlined />}
                  onClick={() => handleImageDelete(image)}
                  className='PostModal__form__imagesFiled__imageBox__deleteButton'
                />
                <img src={image.base64} alt={image.name} />
              </div>
            ))}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostModal;
