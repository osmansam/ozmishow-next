import React from "react";

type Props = {
  type: string;
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
};

const FormRow = ({ type, name, value, handleChange, labelText }: Props) => {
  return (
    <div className="w-full h-full flex justify-between items-center">
      <label className="text-xl w-1/3 p-4" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="border-2 w-2/3"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
