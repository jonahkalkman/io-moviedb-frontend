import { FunctionComponent } from 'react';
import SpinnerIcon from '../atoms/SpinnerIcon';

const Spinner: FunctionComponent = () => {
  return (
    <div className="flex cursor-not-allowed justify-center p-4 text-black transition duration-150 ease-in-out">
      <SpinnerIcon />
    </div>
  );
};

export default Spinner;
