import React from 'react';
import { useHistory } from 'react-router-dom';

import './ExerciceButton.scss';
import Tooltip from '../tooltip/Tooltip';
import deleteIcon from '../../../assets/delete.svg';
import edit from '../../../assets/edit.svg';
import comment from '../../../assets/comment.svg';

const ExerciceButton = ({
  onRemove,
  editId,
  path,
  enableEdit,
}) => {
  const history = useHistory();

  return (
    <div className="exercice-action__button">
      {enableEdit ? (
        <>
          <div className="action-button__edit">
            <Tooltip content="MODIFIER">
              <button
                onClick={() => {
                  history.push(`${path}/${editId}`);
                }}
                type="button"
              >
                <img src={edit} alt="edit" />
              </button>
            </Tooltip>
          </div>
          <div className="action-button__delete">
            <Tooltip content="SUPPRIMER">
              <button onClick={onRemove} type="button">
                <img src={deleteIcon} alt="delete" />
              </button>
            </Tooltip>
          </div>
        </>
      ) : (
        <div className="action-button__edit">
          <Tooltip content="COMMENTER">
            <button
              onClick={() => {
                history.push(`${path}/${editId}`);
              }}
              type="button"
            >
              <img src={comment} alt="edit" />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};
export default ExerciceButton;
