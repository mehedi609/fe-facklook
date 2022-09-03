import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function NotLoggedInRoutes() {
  const {
    auth: { loggedInUser },
  } = useSelector((state) => state);

  return loggedInUser ? <Navigate to="/" /> : <Outlet />;
}
