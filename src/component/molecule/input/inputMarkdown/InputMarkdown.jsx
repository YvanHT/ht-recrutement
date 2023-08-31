/* eslint-disable linebreak-style */
import React, { useRef } from 'react';
import { TbHeading } from 'react-icons/tb';
import { FiBold } from 'react-icons/fi';
import {
  BiImage,
  BiLink,
} from 'react-icons/bi';
import { GoQuote } from 'react-icons/go';
import './InputMarkdown.scss';
import Tooltip from '../../tooltip/Tooltip';
import deleteIcon from '../../../../assets/delete.svg';
import editIcon from '../../../../assets/edit.svg';

const InputMarkdown = (props) => {
  const {
    label,
    name,
    value,
    onChange,
    iconButton,
    iconButtonClick,
  } = props;

  const inputRef = useRef(null);

  const addMarkdown = (markdownSyntax) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart;
      const end = inputRef.current.selectionEnd;
      let selectedText;
      let newValue;
      if (markdownSyntax === '**' || markdownSyntax === '``') {
        selectedText = value.substring(start, end);
        newValue = `${value.substring(0, start)}${markdownSyntax}${selectedText}${markdownSyntax}${value.substring(end)}`;
        onChange({ target: { name, value: newValue } });
      } else {
        selectedText = value.substring(start);
        newValue = `${value.substring(0, start)}${markdownSyntax}${selectedText} `;
      }
      onChange({ target: { name, value: newValue } });
    }
  };

  return (
    <div className="container-input__markdown">
      {label && (
      <span className="label">
        {label}
      </span>
      )}
      <div className="toolbar">
        <Tooltip content="TITRE">
          <button
            type="button"
            onClick={() => addMarkdown('#')}
            data-tip="titre"
          >
            <TbHeading />
          </button>
        </Tooltip>
        <Tooltip content="GRAS">
          <button
            type="button"
            onClick={() => addMarkdown('**')}
          >
            <FiBold />
          </button>
        </Tooltip>
        <Tooltip content="QUOTE">
          <button
            type="button"
            onClick={() => addMarkdown('>')}
          >
            <GoQuote />
          </button>
        </Tooltip>
        <Tooltip content="IMAGE">
          <button
            type="button"
            onClick={() => addMarkdown('![]()')}
          >
            <BiImage />
          </button>
        </Tooltip>
        <Tooltip content="LIEN">
          <button
            type="button"
            onClick={() => addMarkdown('[]()')}
          >
            <BiLink />
          </button>
        </Tooltip>
      </div>
      <textarea
        className="input"
        name={name}
        value={value}
        onChange={onChange}
        ref={inputRef}
        placeholder="Entrez ici les énoncés ..."
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

export default InputMarkdown;
