import React from 'react';
import { NavLink } from 'react-router-dom';
import { nanoid } from 'nanoid';

const Nav = ({ links }) => {
  return (
    <ul className="flex space-x-5 text-secondary-250">
      {links.map(({ to, label, icon }) => {
        const Icon = icon;
        return (
          <NavLink key={nanoid()} to={to} exact activeClassName="text-primary">
            <li className="cursor-pointer">
              <Icon className="inline-block w-6 h-6" />
              <span className="text-base font-semibold ml-1">{label}</span>
            </li>
          </NavLink>
        );
      })}
    </ul>
  );
};

export default Nav;
