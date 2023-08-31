/* eslint-disable linebreak-style */
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import './InputText.scss';
import Tooltip from '../../tooltip/Tooltip';
import deleteIcon from '../../../../assets/delete.svg';
import editIcon from '../../../../assets/edit.svg';

const InputText = (props) => {
  const {
    label,
    name,
    type,
    disabled,
    placeholder,
    success,
    value,
    onChange,
    iconButton,
    iconButtonClick,
    iconEnd,
  } = props;

  return (
    <div className={`container-input__text ${disabled ? 'disabled' : `${success ? 'success' : 'default'}`}`}>
      {label && (
      <span className="label">
        {label}
      </span>
      )}
      <input
        className="input"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {iconButton && (
        <div className="action-button__delete">
          <Tooltip content={(iconButton === 'remove') ? 'SUPPRIMER' : 'MODIFIER'}>
            <button onClick={iconButtonClick} type="button">
              <img src={(iconButton === 'remove') ? deleteIcon : editIcon} alt="delete" />
            </button>
          </Tooltip>
        </div>
      )}
      {iconEnd === 'search' && (
        <div className="icon">
          <BsSearch size={16} />
        </div>
      )}
    </div>
  );
};

export default InputText;
