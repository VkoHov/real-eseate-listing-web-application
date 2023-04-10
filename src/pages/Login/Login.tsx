import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'store/auth';

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(login(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          onChange={handleInputChange}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
