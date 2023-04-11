import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isNil } from 'lodash-es';
import { Button } from 'antd';

import Listing from 'components/Listing';
import CreatePostModal from 'components/CreatePostModal';
import { selectAuth } from 'store/auth';
import { Typography } from 'antd';

import './AdminListingPage.scss';

const { Title } = Typography;

const AdminListingPage = () => {
  const user = useSelector(selectAuth);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalVisible = () => {
    console.log('handleModalVisible: ', isModalVisible);
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

      {!isNil(user.id) ? <Listing userId={user.id ?? 0} /> : null}
      <CreatePostModal visible={isModalVisible} onCancel={handleModalVisible} />
    </div>
  );
};

export default AdminListingPage;
