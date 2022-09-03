import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Login from '../pages/login';

export default function LoggedInRoutes() {
  const {
    auth: { loggedInUser },
  } = useSelector((state) => state);

  return loggedInUser ? <Outlet /> : <Login />;
}
