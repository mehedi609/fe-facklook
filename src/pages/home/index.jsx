import Header from '../../components/header';
import { useSelector } from 'react-redux';
import LeftHome from '../../components/home/left';

export default function Home() {
  const {
    auth: { loggedInUser: user },
  } = useSelector((state) => state);

  return (
    <div>
      <Header />
      <LeftHome user={user} />
    </div>
  );
}
