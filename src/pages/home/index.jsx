import Header from '../../components/header';
import { useSelector } from 'react-redux';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';

export default function Home() {
  const {
    auth: { loggedInUser: user },
  } = useSelector((state) => state);

  return (
    <div>
      <Header />
      <LeftHome user={user} />
      <RightHome user={user} />
    </div>
  );
}
