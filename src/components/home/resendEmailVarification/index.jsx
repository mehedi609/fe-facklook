import { useSelector, useDispatch } from 'react-redux';
import { MoonLoader } from 'react-spinners';
import { resendEmailVerification } from 'reducers/authSlice';
import { STATUS } from 'utils/requestStatus';

import './resend-email-verification.css';

export default function ResendEmailVerificationLink({ user }) {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  return (
    <div className="send_verification">
      <span>
        Your account is not verified,verify your account before it gets deleted
        after a month from creating.
      </span>
      <button onClick={() => dispatch(resendEmailVerification({ user }))}>
        click here to resend verification link
      </button>

      <MoonLoader
        loading={auth.status === STATUS.loading}
        color="#1876f2"
        size={30}
      />

      {auth.status === STATUS.success && (
        <div className="success_text">{auth.message}</div>
      )}
      {auth.status === STATUS.failure && (
        <div className="error_text">{auth.message}</div>
      )}
    </div>
  );
}
