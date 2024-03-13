import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: FunctionComponent = () => {
  return (
    <ul>
      <li>
        <NavLink
          to="/"
          className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-2 w-full"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/favorites"
          className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full"
        >
          Favorites
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
