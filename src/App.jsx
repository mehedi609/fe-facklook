import { Routes, Route } from 'react-router-dom';
import Login from 'pages/login';
import Profile from 'pages/profile';
import Home from 'pages/home';
import LoggedInRoutes from 'routes/LoggedInRoutes';
import NotLoggedInRoutes from 'routes/NotLoggedInRoutes';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/" element={<Home />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </>
  );
}
