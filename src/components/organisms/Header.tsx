import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Search from '../molecules/Search';

const Header: FunctionComponent = () => {
  return (
    <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div className="flex lg:static xl:col-span-2">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">MovieDB</Link>
            </div>
          </div>
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
