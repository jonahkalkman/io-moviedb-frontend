import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: FunctionComponent = () => {
  return (
    <ul>
      <li>
        <NavLink
          to="/"
          className="mb-2 block w-full rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/favorites"
          className="block w-full rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
        >
          Favorites
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
