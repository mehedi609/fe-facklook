import React from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import LoginInput from '../inputs/loginInput';

export default function LoginForm({ setVisible }) {
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="/icons/facebook.svg" alt="facebook" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>

      <div className="login_2">
        <div className="login_2_wrap">
          <Formik>
            <Form>
              <LoginInput
                type="text"
                name="email"
                placeholder="Email address or phone number"
                // onChange={handleLoginChange}
              />
              <LoginInput
                type="password"
                name="password"
                placeholder="Password"
                // onChange={handleLoginChange}
              />
              <button type="submit" className="blue_btn">
                Log In
              </button>
            </Form>
          </Formik>

          <Link to="/forgot" className="forgot_password">
            Forgotten password ?
          </Link>

          <div className="sign_splitter"></div>
          <button className="blue_btn open_signup">Create Account</button>
        </div>
      </div>
    </div>
  );
}
