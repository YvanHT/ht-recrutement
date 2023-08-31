/* eslint-disable linebreak-style */
import React from 'react';
import ExerciceButton from '../../exerciceActionButton/ExerciceButton';
import './CardExercice.scss';

const CardExercice = ({
  data,
  path,
  user,
  handleRemove,
}) => {
  const {
    id,
    titre,
    duree,
    status,
    owner,
  } = data;
  let comment = false;
  if (owner.id) {
    comment = (parseInt(user, 10) === owner.id);
  }
  return (
    <div
      className="card-content"
    >
      <div className="card-head">
        <div className="card-data__title">
          <span>{titre}</span>
        </div>
        <div className="card-data__title">
          <span>{duree}</span>
        </div>
        <div className="card-data__title">
          <span>{status}</span>
        </div>
        <ExerciceButton
          path={path}
          editId={id}
          enableEdit={comment}
          onRemove={handleRemove(id)}
        />
      </div>
    </div>
  );
};

export default CardExercice;
