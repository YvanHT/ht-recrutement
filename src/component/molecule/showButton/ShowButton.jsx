import React from 'react';
import { useHistory } from 'react-router-dom';
import Tooltip from '../tooltip/Tooltip';
import './ShowButton.scss';

import showIcon from '../../../assets/showIcon.svg';

const ShowButton = ({
  path,
  show,
}) => {
  const history = useHistory();

  return (
    <div className="show-button">
      <Tooltip content="VISUALISER">
        <button
          onClick={() => {
            history.push(`${path}/info/${show}`);
          }}
          type="button"
          data-tip="visualiser"
        >
          <img src={showIcon} alt="show" />
        </button>
      </Tooltip>
    </div>
  );
};

export default ShowButton;
