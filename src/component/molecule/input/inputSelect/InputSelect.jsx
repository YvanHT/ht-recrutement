/* eslint-disable linebreak-style */
import React from 'react';
import './InputSelect.scss';
import CardNoOption from '../../card/cardNoOption/CardNoOption';

const InputSelect = (props) => {
  const {
    label,
    data,
    defaultValue,
    name,
    success,
    value,
    onChange,
  } = props;
  const renderOption = () => {
    if (!data) return <CardNoOption />;
    return data?.map((d) => (
      <option key={d.id} value={d.id}>
        {d.name ?? d.label ?? d.type_technology ?? d.type}
      </option>
    ));
  };

  return (
    <div className={`container-input__text ${success ? 'success' : 'default'}`}>
      {label && (
      <span className="label">
        {label}
      </span>
      )}
      <select
        className="input"
        name={name}
        defaultValue={defaultValue ?? ''}
        value={value}
        onChange={onChange}
      >
        <option key="choice" value="">Choisir</option>
        {renderOption()}
      </select>
    </div>
  );
};

export default InputSelect;
