import React from 'react';
import { useHistory } from 'react-router-dom';
import Tooltip from '../tooltip/Tooltip';
import './ActionButton.scss';

import deleteIcon from '../../../assets/delete.svg';
import edit from '../../../assets/edit.svg';

const ActionButton = ({
  onRemove,
  editId,
  path,
}) => {
  const history = useHistory();

  return (
    <div className="action-button">
      <div className="action-button__edit">
        <Tooltip content="MODIFIER">
          <button
            onClick={() => {
              history.push(`${path}/form/${editId}`);
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
    </div>
  );
};
export default ActionButton;
