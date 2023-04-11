import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography, Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AppDispatch } from 'store';
import { signUp, selectAuth, UserRole } from 'store/auth';

import './SignUp.scss';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

const { Title, Link } = Typography;
const { Option } = Select;

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(selectAuth);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: UserRole.USER,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Please confirm your password'),
    }),
    onSubmit: (values) => {
      const { name, email, password, role } = values;
      dispatch(signUp({ name, email, password, role })).then(() => {
        navigate('/');
      });
    },
  });

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [user]);

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='SignUp'>
      <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
        <Col xs={22} sm={16} md={12} lg={8}>
          <Title level={2} className='SignUp__title'>
            Register
          </Title>
          <Form
            name='registrationForm'
            size='large'
            onFinish={formik.handleSubmit}
          >
            <Form.Item label='Name' name='name' className='SignUp__filed'>
              <Input
                id='name'
                name='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <div className='SignUp__errorText'>
                {formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ''}
              </div>
            </Form.Item>
            <Form.Item label='Email' name='email' className='SignUp__filed'>
              <Input
                id='email'
                name='email'
                type='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <div className='SignUp__errorText'>
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ''}
              </div>
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              className='SignUp__filed'
            >
              <Input.Password
                id='password'
                name='password'
                type='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <div className='SignUp__errorText'>
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ''}
              </div>
            </Form.Item>

            <Form.Item
              label='Confirm Password'
              name='confirmPassword'
              className='SignUp__filed'
            >
              <Input.Password
                id='confirmPassword'
                name='confirmPassword'
                type='confirmPassword'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <div className='SignUp__errorText'>
                {formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ''}
              </div>
            </Form.Item>

            <Form.Item label='Select' name='userType'>
              <Select
                id='role'
                onChange={(e) => {
                  formik.handleChange({ target: { name: 'role', value: e } });
                }}
                value={formik.values.role}
                defaultValue={formik.values.role}
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
          <Typography className='SignUp__loginRedirection'>
            Already have an account?{' '}
            <Link onClick={handleNavigateToLogin}>Login now!</Link>
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
