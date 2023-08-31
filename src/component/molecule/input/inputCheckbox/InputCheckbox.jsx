/* eslint-disable linebreak-style */
import React from 'react';
import './InputCheckbox.scss';

const InputCheckbox = (props) => {
  const {
    label,
    name,
    onChange,
    checked,
    disabled,
  } = props;
  return (
    <div className="response__child">
      <input
        type="checkbox"
        name={name}
        value={checked}
        defaultChecked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={`response__text ${checked ? 'text-[#17963E]' : 'text-[#707070]'}`}>{label}</span>
    </div>
  );
};

export default InputCheckbox;
