import { useSelector } from 'react-redux';
import Header from 'components/header';
import LeftHome from 'components/home/left';
import RightHome from 'components/home/right';
import Stories from 'components/home/stories';
import CreatePost from 'components/createPost';

import './home.css';
import ResendEmailVerificationLink from '../../components/home/resendEmailVarification';

export default function Home() {
  const { auth } = useSelector((state) => state);

  return (
    <div className="home">
      <Header />
      <LeftHome user={auth.loggedInUser} />

      <div className="home_middle">
        <Stories />
        {!auth.loggedInUser.verified && (
          <ResendEmailVerificationLink user={auth.loggedInUser} />
        )}
        <CreatePost user={auth.loggedInUser} />
      </div>

      <RightHome user={auth.loggedInUser} />
    </div>
  );
}
