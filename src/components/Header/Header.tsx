import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Row, Col } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { logout, selectAuth } from 'store/auth';
import { AppDispatch } from 'store';

const { Header } = Layout;

const CustomHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Header className='header'>
      <Row>
        <Col xs={24} sm={6}>
          <div className='logo' />
        </Col>
        <Col xs={24} sm={18}>
          <Menu theme='dark' mode='horizontal' className='user-bar'>
            {user.name ? (
              <>
                <Menu.Item key='2' icon={<UserOutlined />}>
                  {user.name.slice(0, 1)}
                </Menu.Item>
                <Menu.Item
                  key='1'
                  icon={<LoginOutlined />}
                  onClick={handleLogout}
                >
                  Log Out
                </Menu.Item>
              </>
            ) : (
              <Menu.Item key='1' icon={<LoginOutlined />} onClick={handleLogin}>
                Login
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default CustomHeader;
