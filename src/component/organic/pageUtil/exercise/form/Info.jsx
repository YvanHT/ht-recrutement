import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { HTTable, HTButton, HTAlert } from '@hightao-dev/reactjs';

import ExerciceButton from '../../../../molecule/exerciceActionButton/ExerciceButton';

import './Info.scss';

import { getDetail } from '../../../../../api/endpoint/technology/technologyApi';
import { deleteOne } from '../../../../../api/endpoint/exercise/ExerciseApi';
import { getJWT } from '../../../../../service/storage/Storage.service';
import LoadingSearch from '../../../../atom/loading/loadingSearch/LoadingSearch';

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
      setType(res.technology.type_technology);
      setRows(res.technology.exercices.map((v) => ({
        id: v.id,
        titre: v.titre,
        duree: v.duree.slice(11, -6),
        question: v.question.question,
        reponse: v.question.reponses.map((k) => (
          <p>- {k.reponse} </p>
        )),
      })));
    } else history.push('/technology');
  };

  const renderTitreRow = (l) => {
    const { titre } = l;
    return (<div>{titre}</div>);
  };

  const renderDureeRow = (l) => {
    const { duree } = l;
    return (<div>{duree}</div>);
  };

  const renderQuestionRow = (l) => {
    const { question } = l;
    return (<div>{question}</div>);
  };

  const renderReponseRow = (l) => {
    const { reponse } = l;
    return (<div>{reponse}</div>);
  };

  const handleRemove = (ids) => async () => {
    const index = rows.findIndex(() => ids.id);

    if (index < 0) {
      return;
    }
    setLoading(true);
    const res = await deleteOne(ids.id, getJWT());
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

  const renderActionRow = (ids) => (
    <div>
      <ExerciceButton
        path="/exercice"
        id={id}
        editId={ids.id}
        onRemove={handleRemove(ids)}
      />
      <HTAlert
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={notification.message}
        onClick={() => setOpen(true)}
        severity={notification.type}
      />
    </div>
  );

  return (
    <div>
      {loading ? <LoadingSearch /> : (
        <>
          <p className="info__title">{`Technology: ${info.name}`}</p>
          <p className="info__subtitle">{` Type: ${type.type_technology} `}</p>
          <div className="info-btn">
            <div className="info-btn__return">
              <HTButton onClick={() => history.push('/technology')}>Retour</HTButton>
            </div>
            <div className="info-btn__save">
              <HTButton onClick={() => history.push(`/exercice/form/${id}`)}>Nouveau exercice</HTButton>
            </div>
          </div>

          <div className="info__content">
            <p className="content__title">Exercices</p>
            <div className="list__data-table">
              <HTTable
                data={rows}
                headRenders={[
                  { key: 'titre', render: () => <div>Titre</div> },
                  { key: 'duree', render: () => <div>Durée</div> },
                  { key: 'question', render: () => <div>Question</div> },
                  { key: 'reponse', render: () => <div>Réponses</div> },
                  { key: 'action', render: () => <div>Actions</div> },
                ]}
                lineRenders={[
                  { render: renderTitreRow },
                  { render: renderDureeRow },
                  { render: renderQuestionRow },
                  { render: renderReponseRow },
                  { render: renderActionRow },
                ]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Info;
