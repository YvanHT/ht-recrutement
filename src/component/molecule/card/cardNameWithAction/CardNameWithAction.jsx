/* eslint-disable linebreak-style */
import React from 'react';
import ActionButton from '../../actionButton/ActionButton';
import './CardNameWithAction.scss';

const CardNameWithAction = ({ data, path, handleRemove }) => {
  const {
    id,
    name,
    label,
    type_technology: type,
  } = data;
  return (
    <div
      className="card-content"
    >
      <div className="card-head">
        <div className="card-data__title">
          <span>{name ?? label ?? type}</span>
        </div>
        <ActionButton
          path={path}
          editId={id}
          onRemove={handleRemove(id)}
        />
      </div>
    </div>
  );
};

export default CardNameWithAction;
