import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Row, Col, Button, Avatar } from 'antd';
import { ProfileOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import {
  logout,
  restoreUserDataFromLS,
  selectAuth,
  UserRole,
} from 'store/auth';
import { AppDispatch } from 'store';
import logo from 'logo.png';

import './Header.scss';

const { Header } = Layout;

const CustomHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(selectAuth);

  useEffect(() => {
    if (!localStorage.getItem('auth') && !user.name) {
      navigate('/login');
    }
    if (localStorage.getItem('auth') && !user.name) {
      dispatch(
        restoreUserDataFromLS(JSON.parse(localStorage.getItem('auth') ?? '')),
      );
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleNavigateToAdminPage = () => {
    navigate('/admin');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Header className='Header'>
      <Row className='Header__content'>
        <Col xs={24} sm={6}>
          <div className='Header__logoBox'>
            <img src={logo} alt='logo' onClick={handleLogoClick} />
          </div>
        </Col>
        <Col xs={24} sm={18} className='Header__content__accountBox'>
          {user.name ? (
            <>
              {user.role === UserRole.AGENT && (
                <Button
                  icon={<ProfileOutlined />}
                  onClick={handleNavigateToAdminPage}
                  className='Header__content__accountBox__adminButton'
                >
                  Admin Page
                </Button>
              )}
              <Button
                icon={<LoginOutlined />}
                onClick={handleLogout}
                className='Header__content__accountBox__logOutButton'
              >
                Log Out
              </Button>
              <Avatar
                style={{ verticalAlign: 'middle', background: '#903232' }}
                size='large'
                gap={1}
              >
                {user.name.slice(0, 1).toUpperCase()}
              </Avatar>
            </>
          ) : (
            <Button icon={<LoginOutlined />} onClick={handleLogin}>
              Login
            </Button>
          )}
        </Col>
      </Row>
    </Header>
  );
};

export default CustomHeader;
