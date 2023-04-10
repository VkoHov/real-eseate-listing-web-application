import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from 'store/auth';

type SignUpFormData = {
  email: string;
  password: string;
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(signUp(formData));
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
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUp;
