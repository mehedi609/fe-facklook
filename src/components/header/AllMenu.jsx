import React from 'react';
import {
  communityMenus,
  createMenus,
  entertainmentMenus,
  metaMenus,
  personalMenus,
  professionsalMenus,
  shoppingMenus,
  socialMenus,
} from '../../utils/allMenuData';
import AllMenuItem from './AllMenuItem';

const AllMenu = () => {
  return (
    <div className="all_menu">
      <div className="all_menu_header">Menu</div>

      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Search Menu" />
          </div>

          <div className="all_menu_group">
            <div className="all_menu_group_header">Social</div>
            {socialMenus.map((item, i) => (
              <AllMenuItem
                key={i}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="all_menu_group">
            <div className="all_menu_group_header">Entertainment</div>
            {entertainmentMenus.map((item, i) => (
              <AllMenuItem
                key={i}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="all_menu_group">
            <div className="all_menu_group_header">Shopping</div>
            {shoppingMenus.map((item, i) => (
              <AllMenuItem
                key={i}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="all_menu_group">
            <div className="all_menu_group_header">Personal</div>
            {personalMenus.map((item, i) => (
              <AllMenuItem
                key={i}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="all_menu_group">
            <div className="all_menu_group_header">Professional</div>
            {professionsalMenus.map((item, i) => (
              <AllMenuItem
                key={i}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="all_menu_group">
            <div className="all_menu_group_header">Community Resources</div>
            {communityMenus.map((item, i) => (
              <AllMenuItem
                key={i}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="all_menu_group">
            <div className="all_menu_group_header">More from Meta</div>
            {metaMenus.map((item, i) => (
              <AllMenuItem
                key={i}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>

        <div className="all_right">
          <div className="all_right_header">Create</div>
          {createMenus.map((item, i) => (
            <div className="all_right_item hover1" key={i}>
              <div className="all_right_circle">
                <i className={item.icon}></i>
              </div>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
