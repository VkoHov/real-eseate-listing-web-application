import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { login, selectAuth } from 'store/auth';
import { AppDispatch } from 'store';

import './Login.scss';

const { Title, Link } = Typography;

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(selectAuth);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      dispatch(login({ ...values })).then((res) => {
        if (res.payload) {
          navigate('/');
        }
      });
    },
  });

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [user]);

  const handleNavigateToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className='Login'>
      <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
        <Col xs={22} sm={16} md={12} lg={8}>
          <Title level={2} className='Login__title'>
            Login
          </Title>
          <Form name='loginForm' size='large' onFinish={formik.handleSubmit}>
            <Form.Item label='Email' name='email' className='Login__filed'>
              <Input
                id='email'
                name='email'
                type='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <div className='Login__errorText'>
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ''}
              </div>
            </Form.Item>

            <Form.Item label='Password' name='password'>
              <Input.Password
                id='password'
                name='password'
                type='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <div className='Login__errorText'>
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ''}
              </div>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Login
              </Button>
            </Form.Item>
          </Form>
          <Typography className='Login__signUpRedirection'>
            Don't have an account?{' '}
            <Link onClick={handleNavigateToSignUp}>Sign up now!</Link>
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
