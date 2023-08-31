import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import './Info.scss';

import { HTAlert } from '@hightao-dev/reactjs';

import { getOne, editOne } from '../../../../../api/endpoint/user/userApi';
import { getJWT } from '../../../../../service/storage/Storage.service';

import HTLoading from '../../../../atom/loading/HTLoading';
import InputSelect from '../../../../molecule/input/inputSelect/InputSelect';

const roles = [
  {
    label: 'Candidat',
    id: 'ROLE_CANDIDATE',
  },
  {
    label: 'Recruteur',
    id: 'ROLE_RECRUTEUR',
  },
  {
    label: 'Admin',
    id: 'SUPER_ADMIN',
  },
];

const roleData = {
  ROLE_CANDIDATE: 'Candidat',
  ROLE_RECRUTEUR: 'Recruteur',
  SUPER_ADMIN: 'Admin',
};

const Info = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    role: '',
  });
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const getInfo = async () => {
    setLoading(true);

    const res = await getOne(getJWT(), id);
    if (res.recruteur) {
      setLoading(false);
      setInfo(res.recruteur);
      return;
    }
    history.push('/user');
  };

  const editInfo = async () => {
    const res = await editOne(id, inputValue, getJWT());
    if (res instanceof Error) {
      setNotification({
        message: 'invalid request',
        type: 'info',
      });
      setOpen(true);
      return;
    }
    setNotification({
      message: res.message,
      type: 'success',
    });
    setOpen(true);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const inputSelectChange = (event) => {
    setInputValue({ ...inputValue, role: event.target.value });
    editInfo();
  };

  return (
    <div className="info">
      {loading ? <HTLoading /> : (
        <>
          <span className="info__loading">{loading}</span>
          <p className="info__name">{`Nom et prénom : ${info.name} ${info.last_name}`}</p>
          <p className="info__email">{`Email : ${info.email}`}</p>
          <p className="info__role">{`Rôle : ${roleData[info.roles]}`}</p>
          <span className="info__title">Modifier rôle</span>
          <InputSelect
            label="Rôles :"
            name="role"
            value={inputValue.role}
            data={roles}
            disableClearable={info.role}
            onChange={(e) => inputSelectChange(e)}
          />
        </>
      )}
      <div>
        <HTAlert
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          onClick={() => setOpen(true)}
          message={notification.message}
          severity={notification.type}
        />
      </div>
    </div>
  );
};

export default Info;
