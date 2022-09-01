import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { MoonLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';

import LoginInput from '../inputs/loginInput';
import { signIn } from '../../reducers/authSlice';
import { STATUS } from '../../utils/requestStatus';

const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
});

export default function LoginForm({ setVisible }) {
  const loginInfos = {
    email: '',
    password: '',
  };

  const [login, setLogin] = useState(loginInfos);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="/icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{ ...login }}
            validationSchema={LoginSchema}
            onSubmit={() => {
              dispatch(signIn(login))
                .unwrap()
                .then((loggedInUser) => {
                  Cookies.set('user', JSON.stringify(loggedInUser));
                  navigate('/');
                });
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  bottom
                  onChange={handleLoginChange}
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten password?
          </Link>

          <MoonLoader
            loading={auth.status === STATUS.loading}
            color="#1876f2"
            size={30}
          />

          {auth.status === STATUS.failure && (
            <div className="error_text">{auth.message}</div>
          )}

          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page </b>
          for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
