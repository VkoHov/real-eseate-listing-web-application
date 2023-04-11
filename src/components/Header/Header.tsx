import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Row, Col, Button } from 'antd';
import {
  ProfileOutlined,
  LoginOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { logout, restoreUserDataFromLS, selectAuth } from 'store/auth';
import { AppDispatch } from 'store';
import { useEffect } from 'react';
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
      <Row>
        <Col xs={24} sm={6}>
          <div className='Header__logoBox'>
            <img src={logo} alt='logo' onClick={handleLogoClick} />
          </div>
        </Col>
        <Col xs={24} sm={18}>
          {user.name ? (
            <>
              <Button
                key='e'
                icon={<ProfileOutlined />}
                onClick={handleNavigateToAdminPage}
              >
                Admin Page
              </Button>
              <Button key='2' icon={<UserOutlined />}>
                {user.name}
              </Button>
              <Button key='1' icon={<LoginOutlined />} onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <Button key='1' icon={<LoginOutlined />} onClick={handleLogin}>
              Login
            </Button>
          )}
        </Col>
      </Row>
    </Header>
  );
};

export default CustomHeader;
