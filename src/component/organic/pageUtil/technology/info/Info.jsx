import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { HTButton, HTAlert } from '@hightao-dev/reactjs';
import HTLoading from '../../../../atom/loading/HTLoading';

import './Info.scss';

import { getDetail } from '../../../../../api/endpoint/technology/technologyApi';
import { deleteOne } from '../../../../../api/endpoint/exercise/ExerciseApi';
import { getJWT, getUser } from '../../../../../service/storage/Storage.service';
import CardNotFound from '../../../../molecule/card/cardNotFound/CardNotFound';
import CardExercice from '../../../../molecule/card/cardExercice/CardExercise';

const Info = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [type, setType] = useState({});
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    setLoading(true);
    const res = await getDetail(getJWT(), id);
    if (res.technology) {
      setLoading(false);
      setInfo(res.technology);
      setType(res.technology.type_technology ?? '');
      setRows(res.technology.exercices.map((v) => ({
        id: v.id,
        titre: v.titre,
        duree: v.duree,
        questions: v.questions,
        enunciated: v.enunciated,
        owner: v.owner,
      })));
    } else history.push('/technology');
  };

  const handleRemove = (ind) => async () => {
    const index = rows.findIndex((row) => row.id === id);

    if (index < 0) {
      return;
    }
    setLoading(true);
    const res = await deleteOne(ind, getJWT());
    const data = [...rows];
    data.splice(index, 1);
    setRows(data);
    setLoading(false);
    if (res instanceof Error) {
      setNotification({
        message: 'invalid request',
        type: 'warning',
      });
      return;
    }

    setNotification({
      message: res.message,
      type: 'success',
    });

    setOpen(true);
  };

  const renderRows = () => {
    if (rows.length === 0) return <CardNotFound />;
    return rows.map((row) => <CardExercice data={row} path={`exercise/form/${id}`} handleRemove={handleRemove} user={getUser()} />);
  };

  return (
    <div>
      {loading ? <HTLoading /> : (
        <>
          <p className="info__title">{`Technology: ${info.name}`}</p>
          <p className="info__subtitle">{` Type: ${type.type_technology ?? ''} `}</p>
          <div className="info-btn">
            <div className="info-btn__return">
              <HTButton onClick={() => history.push('/technology')}>Retour</HTButton>
            </div>
            <div className="info-btn__save">
              <HTButton onClick={() => history.push(`/exercice/form/${id}`)}>Nouveau exercice</HTButton>
            </div>
          </div>
          <HTAlert
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message={notification.message}
            onClick={() => setOpen(true)}
            severity={notification.type}
          />
          <div className="info__content">
            <p className="content__title">Exercices</p>
            <div className="list__data-table">
              {renderRows()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Info;
