import { FunctionComponent, useState } from 'react';
import clsx from 'clsx';

interface Props {
  isToggled: boolean;
  onToggle: (toggled: boolean) => void;
}

const Toggle: FunctionComponent<Props> = ({ isToggled, onToggle }: Props) => {
  const [toggled, setToggled] = useState<boolean>(isToggled);

  const buttonClasses = clsx({
    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gray-200': true,
    'bg-green-600': toggled,
  });

  const spanClasses = clsx({
    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200': true,
    'translate-x-5': toggled,
  });

  return (
    <div className="flex flex-row-reverse">
      <button
        onClick={() => {
          setToggled(!toggled);
          onToggle(!toggled);
        }}
        type="button"
        className={buttonClasses}
        role="switch"
        aria-checked="false"
      >
        <span aria-hidden="true" className={spanClasses}></span>
      </button>
      <b>Favorite:</b>
    </div>
  );
};

export default Toggle;
