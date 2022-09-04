import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { STATUS } from 'utils/requestStatus';
import { activateAccount } from 'reducers/authSlice';

import Header from 'components/header';
import LeftHome from 'components/home/left';
import RightHome from 'components/home/right';
import Stories from 'components/home/stories';
import CreatePost from 'components/createPost';
import ActivateAccountForm from './ActivateAccountForm';

import './home.css';

export default function ActivateAccount() {
  const { auth } = useSelector((state) => state);
  const [loading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    dispatch(activateAccount({ token, user: auth.loggedInUser }))
      .unwrap()
      .then(() => {
        Cookies.set(
          'user',
          JSON.stringify({ ...auth.loggedInUser, verified: true }),
        );
      })
      .finally(() => {
        setTimeout(() => {
          navigate('/');
        }, 2000);
      });
  }, [dispatch, auth.loggedInUser, token, navigate]);

  return (
    <div className="home">
      {auth.status === STATUS.success && (
        <ActivateAccountForm
          type="success"
          header="Account verification succeeded."
          text={auth.message}
          loading={loading}
        />
      )}
      {auth.status === STATUS.failure && (
        <ActivateAccountForm
          type="error"
          header="Account verification failed."
          text={auth.message}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={auth.loggedInUser} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={auth.loggedInUser} />
      </div>
      <RightHome user={auth.loggedInUser} />
    </div>
  );
}
