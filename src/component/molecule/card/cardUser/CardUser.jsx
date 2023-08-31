/* eslint-disable linebreak-style */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './CardUser.scss';

const roleData = {
  ROLE_CANDIDATE: { value: 'Candidat' },
  ROLE_RECRUTEUR: { value: 'Recruteur' },
  ROLE_ADMIN: { value: 'Admin' },
};

const CardUser = ({ user, path }) => {
  const {
    id,
    avatar,
    name,
    email,
    role,
    poste,
  } = user;
  const history = useHistory();
  return (
    <div
      className="card-content"
    >
      <div className="card-head">
        <div className="card-profil">
          <img width="40" height="40" src={avatar} alt={avatar} />
          <button
            type="button"
            onClick={() => {
              history.push(`${path}/info/${id}`);
            }}
            className="card-title"
          >
            <span>{name}</span>
            <span className="card-mail">{email}</span>
          </button>
        </div>
        <div className="card-role">{roleData[role].value}</div>
      </div>
      <div className="card-post"><span>{poste}</span></div>
    </div>
  );
};
export default CardUser;
