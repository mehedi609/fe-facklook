import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';

import RegisterInput from 'components/inputs/registerInput';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import { signUp } from 'reducers/authSlice';
import { STATUS } from 'utils/requestStatus';

export default function RegisterForm({ setVisible }) {
  const userInfos = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  };

  const [user, setUser] = useState(userInfos);
  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();

  const { bYear, bMonth, bDay, gender } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const yearTemp = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);

  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };

  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidationSchema = Yup.object({
    firstName: Yup.string()
      .required("What's your First name?")
      .min(2, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    lastName: Yup.string()
      .required("What's your Last name?")
      .min(2, 'Last name must be between 2 and 16 characters.')
      .max(16, 'Last name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password.",
      )
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).',
      )
      .min(6, 'Password must be least 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
  });

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            ...user,
          }}
          validationSchema={registerValidationSchema}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                "it looks like you've entered the wrong info.Please make sure that you use your real date of birth.",
              );
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                "it looks like you've entered the wrong info.Please make sure that you use your real date of birth.",
              );
            } else if (gender === '') {
              setDateError('');
              setGenderError(
                'Please choose a gender. You can change who can see this later.',
              );
            } else {
              setDateError('');
              setGenderError('');
              dispatch(signUp(user))
                .unwrap()
                .then((registeredUser) => {
                  const { msg, ...rest } = registeredUser;
                  Cookies.set('user', JSON.stringify(rest));
                  navigate('/');
                });
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleRegisterChange}
                />

                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="lastName"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>

                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>

              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>

                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>

              <div className="reg_infos">
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>

              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup" type="submit">
                  Sign Up
                </button>
              </div>

              <MoonLoader
                loading={auth.status === STATUS.loading}
                color="#1876f2"
                size={30}
              />
              {auth.status === STATUS.failure && (
                <div className="error_text">{auth.message}</div>
              )}
              {auth.status === STATUS.success && (
                <div className="success_text">{auth.message}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
