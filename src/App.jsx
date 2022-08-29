import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
