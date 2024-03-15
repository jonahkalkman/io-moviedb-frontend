import { FunctionComponent } from 'react';

interface InputFieldProps {
  title: string;
  value: string;
  inputType: 'string' | 'number';
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FunctionComponent<InputFieldProps> = ({
  title,
  value,
  inputType,
  onValueChange,
}) => {
  return (
    <input
      id={title}
      name={title}
      type={inputType}
      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 text-sm placeholder-gray-500 sm:text-sm"
      onChange={(e) => {
        onValueChange(e);
      }}
      value={value}
    />
  );
};

export default InputField;
