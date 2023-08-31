import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { HTTable, HTButton, HTAlert } from '@hightao-dev/reactjs';

import ExerciceButton from '../../../../molecule/exerciceActionButton/ExerciceButton';

import './Info.scss';

import { getDetail } from '../../../../../api/endpoint/technology/technologyApi';
import { deleteOne } from '../../../../../api/endpoint/exercise/ExerciseApi';
import { getJWT } from '../../../../../service/storage/Storage.service';
import Tooltip from '../../../../molecule/tooltip/Tooltip';
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
      setType(res.technology.type_technology ?? '');
      setRows(res.technology.exercices.map((v) => ({
        id: v.id,
        titre: v.titre,
        duree: v.duree,
        questions: v.questions,
        enunciateds: v.enunciateds,
      })));
    } else history.push('/technology');
  };

  const convertHMS = (value) => {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    let seconds = sec - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = `0${hours}`; }
    if (minutes < 10) { minutes = `0${minutes}`; }
    if (seconds < 10) { seconds = `0${seconds}`; }
    return `${hours} : ${minutes} : ${seconds}`;
  };

  const renderTitreRow = (l) => {
    const { titre } = l;
    return (<div>{titre}</div>);
  };

  const renderDureeRow = (l) => {
    const { duree } = l;
    return (
      <div>
        <p>{convertHMS(duree)}</p>
      </div>
    );
  };

  const renderQuestionRow = (l) => {
    const { questions } = l;
    return (
      <Tooltip
        content={
          questions.map((q) => (
            <>
              <p>Question: {q.question} </p>
              <div>
                Réponses:
                <ul>
                  {q.reponses.map((k) => (
                    <li>{k.reponse} </li>
                  ))}
                </ul>
              </div>
            </>
          ))
        }
      >
        <div className="text-underline">
          {questions.length}
        </div>
      </Tooltip>
    );
  };

  const renderEnunciatedRow = (l) => {
    const { enunciateds } = l;
    return (
      <Tooltip
        content={enunciateds.map((e) => (
          <p>- {e.enunciated} </p>
        ))}
      >
        <div className="text-underline">
          {enunciateds.length}
        </div>
      </Tooltip>
    );
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
          <p className="info__subtitle">{` Type: ${type.type_technology ?? ''} `}</p>
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
                  { key: 'enunciated', render: () => <div>Enoncés</div> },
                  { key: 'question', render: () => <div>Questions</div> },
                  { key: 'action', render: () => <div>Actions</div> },
                ]}
                lineRenders={[
                  { render: renderTitreRow },
                  { render: renderDureeRow },
                  { render: renderEnunciatedRow },
                  { render: renderQuestionRow },
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
