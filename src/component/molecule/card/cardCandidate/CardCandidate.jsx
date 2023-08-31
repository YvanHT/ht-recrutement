/* eslint-disable linebreak-style */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './CardCandidate.scss';

const roleData = {
  ROLE_CANDIDATE: { value: 'Candidat' },
  ROLE_RECRUTEUR: { value: 'Recruteur' },
  SUPER_ADMIN: { value: 'Admin' },
};

const CardCandidate = ({ candidate, path }) => {
  const {
    id,
    avatar,
    name,
    email,
    poste,
    role,
    candidateTechnologies,
  } = candidate;
  const history = useHistory();

  const renderListTechnology = () => candidateTechnologies.map((ct) => (
    <div key={ct.technology_id} className="card-badge">
      <span>{ct.technology}</span>
    </div>
  ));

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
      <div className="card-technology">
        {renderListTechnology()}
      </div>
    </div>
  );
};
export default CardCandidate;
