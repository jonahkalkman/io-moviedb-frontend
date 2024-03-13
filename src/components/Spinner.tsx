import { FunctionComponent } from 'react';
import SpinnerIcon from './icons/SpinnerIcon';

const Spinner: FunctionComponent = () => {
  return (
    <div className="p-4 flex justify-center text-black transition ease-in-out duration-150 cursor-not-allowed">
      <SpinnerIcon />
    </div>
  );
};

export default Spinner;
