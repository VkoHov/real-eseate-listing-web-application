import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectAuth } from 'store/auth';
import { AppDispatch } from 'store';

const { Title, Link } = Typography;

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [user]);

  const handleNavigateToSignUp = () => {
    navigate('/signup');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(login({ email, password })).then(() => {
      navigate('/');
    });
  };

  return (
    <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Login
        </Title>
        <Form name='loginForm' size='large' onFinish={handleSubmit}>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please input a valid email!' },
            ]}
          >
            <Input value={email} onChange={handleEmailChange} />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password value={password} onChange={handlePasswordChange} />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Typography style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link onClick={handleNavigateToSignUp}>Sign up now!</Link>
        </Typography>
      </Col>
    </Row>
  );
};

export default Login;
