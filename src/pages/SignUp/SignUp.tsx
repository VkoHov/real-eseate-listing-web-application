import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography, Select } from 'antd';
import { AppDispatch } from 'store';
import { signUp, selectAuth, UserRole } from 'store/auth';

const { Title, Link } = Typography;
const { Option } = Select;

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<UserRole>(UserRole.USER);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [user]);

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleRoleChange = (value: UserRole) => {
    setRole(value);
  };

  const handleSubmit = () => {
    dispatch(signUp({ name, email, password, role })).then(() => {
      navigate('/');
    });
  };

  return (
    <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Register
        </Title>
        <Form name='registrationForm' size='large' onFinish={handleSubmit}>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input value={name} onChange={handleNameChange} />
          </Form.Item>
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

          <Form.Item
            label='Confirm Password'
            name='confirmPassword'
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords do not match!'),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Item>

          <Form.Item
            label='Select'
            name='userType'
            rules={[{ required: true, message: 'Please select a user type!' }]}
          >
            <Select
              onChange={handleRoleChange}
              value={role}
              defaultValue={role}
            >
              <Option value='user'>User</Option>
              <Option value='agent'>Agent</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <Typography style={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link onClick={handleNavigateToLogin}>Login now!</Link>
        </Typography>
      </Col>
    </Row>
  );
};

export default SignUp;
