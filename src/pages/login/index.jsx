import { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/login/LoginForm';

import LoginInput from '../../components/inputs/loginInput';
import './login.css';

const loginInfos = {
  email: '',
  password: '',
};

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(60, 'Password must be at most 60 characters')
    .required('Password is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
});

export default function Login() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <div className="login">
      <div className="login_wrapper">
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
                initialValues={{ email, password }}
                validationSchema={LoginSchema}
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
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
              <b>Create a Page </b>
              for a celebrity, brand or business.
            </Link>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
}
