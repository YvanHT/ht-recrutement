/* eslint-disable linebreak-style */
import React from 'react';
import './InputTextarea.scss';
import Tooltip from '../../tooltip/Tooltip';
import deleteIcon from '../../../../assets/delete.svg';
import editIcon from '../../../../assets/edit.svg';

const InputTextarea = (props) => {
  const {
    label,
    name,
    success,
    value,
    onChange,
    iconButton,
    iconButtonClick,
  } = props;

  return (
    <div className={`container-input ${success ? 'success' : 'default'}`}>
      {label && (
      <span className="label">
        {label}
      </span>
      )}
      <textarea
        className="input"
        name={name}
        value={value}
        onChange={onChange}
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
    </div>
  );
};

export default InputTextarea;
