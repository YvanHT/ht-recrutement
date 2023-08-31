/* eslint-disable linebreak-style */
import React from 'react';
import { useHistory } from 'react-router-dom';

import Config from '../../../../config/config';
import ShowButton from '../../showButton/ShowButton';
import ActionButton from '../../actionButton/ActionButton';
import './CardTechnology.scss';

const CardTechnology = ({ technology, path, handleRemove }) => {
  const {
    id,
    logo,
    name,
  } = technology;
  const history = useHistory();
  return (
    <div
      className="card-content"
    >
      <div className="card-head">
        <div className="card-technology__title">
          <img width="40" height="40" src={`${Config.apiUrl}/${logo}`} alt={logo} />
          <button
            type="button"
            onClick={() => {
              history.push(`${path}/info/${id}`);
            }}
            className="button-title"
          >
            <span>{name}</span>
          </button>
        </div>
        <div className="button">
          <div className="show_button">
            <ShowButton
              path={path}
              show={id}
            />
          </div>
          <ActionButton
            path={path}
            editId={id}
            onRemove={handleRemove(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardTechnology;
