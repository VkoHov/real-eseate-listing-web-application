import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isNil } from 'lodash-es';
import { Button, Typography } from 'antd';

import Listing from 'components/Listing';
import CreatePostModal from 'components/PostModal';
import { selectAuth, UserRole } from 'store/auth';

import './AdminListingPage.scss';

const { Title } = Typography;

const AdminListingPage = () => {
  const user = useSelector(selectAuth);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (user.role !== UserRole.AGENT) {
      navigate('/');
    }
  }, [user]);

  const handleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className='AdminListingPage'>
      <div className='AdminListingPage__createButtonWrapper'>
        <Title level={3}>Admin Page</Title>
        <Button type='primary' onClick={handleModalVisible}>
          Create Post
        </Button>
      </div>
      <div className='AdminListingPage__listingWrapper'>
        {!isNil(user.id) ? <Listing userId={user.id ?? 0} /> : null}
      </div>
      <CreatePostModal visible={isModalVisible} onCancel={handleModalVisible} />
    </div>
  );
};

export default AdminListingPage;
