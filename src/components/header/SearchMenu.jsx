import React, { useEffect, useRef, useState } from 'react';
import { Return, Search } from '../../svg';
import { useClickUserSide } from '../../utils/clickOutside';

const SearchMenu = ({ color, setShowSearchMenu }) => {
  const [iconVisible, setIconVisible] = useState(true);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  useClickUserSide(menuRef, () => setShowSearchMenu(false));

  useEffect(() => inputRef.current.focus(), []);

  return (
    <div className="header_left search_area scrollbar" ref={menuRef}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => setShowSearchMenu(false)}
          >
            <Return color={color} />
          </div>
        </div>

        <div className="search" onClick={() => inputRef.current.focus()}>
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}

          <input
            type="text"
            placeholder="Search Facebook"
            ref={inputRef}
            onFocus={() => setIconVisible(false)}
            onBlur={() => setIconVisible(true)}
          />
        </div>
      </div>

      <div className="search_history_header">
        <span>Recent searches</span>
        <a>Edit</a>
      </div>

      <div className="search_history"></div>

      <div className="search_results scrollbar"></div>
    </div>
  );
};

export default SearchMenu;
