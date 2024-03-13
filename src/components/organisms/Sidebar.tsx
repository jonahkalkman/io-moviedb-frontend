import { FunctionComponent } from 'react';
import Navigation from '../molecules/Navigation';

const Sidebar: FunctionComponent = () => {
  return (
    <nav
      role="navigation"
      aria-label="Sidebar"
      className="sticky top-4 divide-y divide-gray-300"
    >
      <div className="space-y-1 pb-8">
        <Navigation />
      </div>
    </nav>
  );
};

export default Sidebar;
