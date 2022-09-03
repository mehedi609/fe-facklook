import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchMenu from './SearchMenu';
import AllMenu from './AllMenu';
import { useClickUserSide } from 'utils/clickOutside';
import UserMenu from './userMenu';
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from 'svg';

import './header.css';

export default function Header() {
  const { loggedInUser: user } = useSelector((state) => state.auth);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  useClickUserSide(allMenuRef, () => setShowAllMenu(false));
  useClickUserSide(userMenuRef, () => setShowUserMenu(false));

  const color = '#65676b';

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>

      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}

      <div className="header_middle">
        <Link to="/" className="middle_icon active">
          <HomeActive />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>

      <div className="header_right">
        <Link to="/profile" className="profile_link hover1">
          <img src={user?.picture} alt="user_image" />
          <span>{user?.firstName}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && 'active_header'}`}
          ref={allMenuRef}
          onClick={() => setShowAllMenu(!showAllMenu)}
        >
          <div style={{ transform: 'translateY(2px)' }}>
            <Menu />
          </div>
          {showAllMenu && (
            <AllMenu setShowSearchMenu={(prevState) => !prevState} />
          )}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && 'active_header'}`}
          ref={userMenuRef}
        >
          <div onClick={() => setShowUserMenu((prevState) => !prevState)}>
            <div style={{ transform: 'translateY(2px)' }}>
              <ArrowDown />
            </div>
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
