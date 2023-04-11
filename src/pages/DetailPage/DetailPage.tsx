import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Carousel, Button, Modal, message } from 'antd';
import { isEmpty } from 'lodash-es';

import { deletePost, fetchPost, selectPost } from 'store/posts';
import { AppDispatch } from 'store';
import { selectAuth } from 'store/auth';
import PostModal, { Image } from 'components/PostModal';

import './DetailPage.scss';

const DetailsPage = () => {
  const post = useSelector(selectPost);
  const user = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [isEditPostModalVisible, setIsEditPostModalVisible] =
    useState<boolean>(false);

  const handleDelete = (postId: number | string) => {
    Modal.confirm({
      title: 'Delete Post',
      content: 'Are you sure you want to delete this post?',
      onOk: () => {
        dispatch(deletePost(postId)).then(() => {
          message.success('Post deleted successfully!');
          navigate('/');
        });
      },
    });
  };

  const handleEditPostModalVisibility = () => {
    setIsEditPostModalVisible(!isEditPostModalVisible);
  };

  useEffect(() => {
    dispatch(fetchPost(postId ?? '0'));
  }, []);

  return (
    <div className='DetailsPage'>
      {user.id === post?.userId && (
        <div className='DetailsPage__actionButtons'>
          <Button type='primary' onClick={handleEditPostModalVisibility}>
            Edit
          </Button>
          <Button
            type='default'
            onClick={() => handleDelete(postId ?? 0)}
            className='DetailsPage__actionButtons__deleteButton'
          >
            Delete
          </Button>
        </div>
      )}

      <div className='DetailsPage__content'>
        <div className='DetailsPage__content__imagesSection'>
          {!isEmpty(post?.images) ? (
            <Carousel
              autoplay
              className='DetailsPage__content__imagesSection__carousel'
            >
              {/* Render additional images using Carousel component */}
              {post?.images?.map((image: Image, index: number) => (
                <div key={image.name + index}>
                  <img src={image.base64} alt='Property' />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className='DetailsPage__content__imagesSection__noImageBox'>
              <img
                src={
                  'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
                }
                alt='Property'
              />
            </div>
          )}
          <div className='DetailsPage__content__imagesSection__imagesList'>
            {post?.images.map((image: Image, index: number) => (
              <div
                key={index}
                className='DetailsPage__content__imagesSection__imagesList__imageBox'
              >
                <img src={image.base64} alt='Property' />
              </div>
            ))}
          </div>
        </div>

        <div className='DetailsPage__content__infoSection'>
          <Card
            title='Information'
            className='DetailsPage__content__infoSection__card'
          >
            <div className='DetailsPage__content__infoSection__card__itemBox'>
              <p className='DetailsPage__content__infoSection__card__itemBox__title'>
                Title
              </p>
              <p className='DetailsPage__content__infoSection__card__itemBox__content'>
                {post?.title}
              </p>
            </div>
            <div className='DetailsPage__content__infoSection__card__itemBox'>
              <p className='DetailsPage__content__infoSection__card__itemBox__title'>
                Description
              </p>
              <p className='DetailsPage__content__infoSection__card__itemBox__content'>
                {post?.description}
              </p>
            </div>
            <div className='DetailsPage__content__infoSection__card__itemBox'>
              <p className='DetailsPage__content__infoSection__card__itemBox__title'>
                Type
              </p>
              <p className='DetailsPage__content__infoSection__card__itemBox__content'>
                {post?.type}
              </p>
            </div>
            <div className='DetailsPage__content__infoSection__card__itemBox'>
              <p className='DetailsPage__content__infoSection__card__itemBox__title'>
                Listing Type
              </p>
              <p className='DetailsPage__content__infoSection__card__itemBox__content'>
                {post?.listingType}
              </p>
            </div>
            <div className='DetailsPage__content__infoSection__card__itemBox'>
              <p className='DetailsPage__content__infoSection__card__itemBox__title'>
                Location
              </p>
              <p className='DetailsPage__content__infoSection__card__itemBox__content'>
                {post?.location}
              </p>
            </div>
            <div className='DetailsPage__content__infoSection__card__itemBox'>
              <p className='DetailsPage__content__infoSection__card__itemBox__title'>
                Price
              </p>
              <p className='DetailsPage__content__infoSection__card__itemBox__content'>
                {`${post?.price}$`}
              </p>
            </div>
          </Card>
          <Card
            title='Contact Agent'
            className='DetailsPage__content__infoSection__card'
          >
            <div className='DetailsPage__content__infoSection__card__itemBox'>
              <p className='DetailsPage__content__infoSection__card__itemBox__title'>
                Name
              </p>
              <p className='DetailsPage__content__infoSection__card__itemBox__content'>
                {post?.userName}
              </p>
            </div>
            <div className='DetailsPage__content__infoSection__card__itemBox'>
              <p className='DetailsPage__content__infoSection__card__itemBox__title'>
                Email
              </p>
              <p className='DetailsPage__content__infoSection__card__itemBox__content'>
                {post?.userEmail}
              </p>
            </div>
          </Card>
        </div>
      </div>
      {isEditPostModalVisible && (
        <PostModal
          visible={isEditPostModalVisible}
          post={post ?? undefined}
          onCancel={handleEditPostModalVisibility}
        />
      )}
    </div>
  );
};

export default DetailsPage;
