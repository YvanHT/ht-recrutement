/* eslint-disable linebreak-style */
import React from 'react';
import './InputRadio.scss';

const InputRadio = (props) => {
  const {
    label,
    name,
    value,
    onChange,
    checked,
    disabled,
  } = props;
  return (
    <div className="response__child">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={`response__text ${checked ? 'text-[#17963E]' : 'text-[#707070]'}`}>{label}</span>
    </div>
  );
};

export default InputRadio;
