/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import {
  HTButton,
  HTDivider,
} from '@hightao-dev/reactjs';
import { useHistory, useParams } from 'react-router-dom';
import './Form.scss';

import {
  getOne,
} from '../../../../../api/endpoint/exercise/ExerciseApi';
import { getJWT } from '../../../../../service/storage/Storage.service';

import FormPreviewEnunciated from './formPreview/FormPreviewEnunciated';
import FormPreviewQuestion from './formPreview/FormPreviewQuestion';
import LoadingSearch from '../../../../atom/loading/loadingSearch/LoadingSearch';

const Comment = () => {
  const { id, ids } = useParams();

  const history = useHistory();

  const [inputValue, setInputValue] = useState({
    titre: '',
    duree: 0,
    status: false,
    type: '',
    questions: [{
      id: null,
      question: '',
      type: '',
      reponses: [{
        reponse: '',
        etat: false,
        name: '',
        file: null,
      }],
    }],
    enunciateds: [{
      id: null,
      enunciated: '',
      name: '',
      file: null,
    }],
  });

  const [loading, setLoading] = useState(false);
  const [minute, setMinute] = useState('');
  const [enunciated, setEnunciateds] = useState([{
    id: null,
    enunciated: '',
    name: '',
    file: null,
  }]);
  const [questionState, setQuestionState] = useState([{
    id: null,
    question: '',
    type: '',
    reponses: [{
      reponse: '',
      etat: false,
      name: '',
      file: null,
    }],
  }]);

  useEffect(async () => {
    setLoading(true);
    if (ids) {
      const res = await getOne(ids, getJWT());
      const {
        titre,
        duree,
        status,
        questions: questionData,
        enunciateds: enunciatedData,
      } = res.exercice;
      setInputValue({
        ...inputValue,
        titre,
        duree,
        status,
        questions: questionData,
        enunciateds: enunciatedData,
      });
      setEnunciateds(enunciatedData);
      setQuestionState(questionData);
    }
    setLoading(false);
  }, [ids]);

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

  useEffect(() => {
    const val = convertHMS(inputValue.duree);
    setMinute(val);
  }, [inputValue.duree]);

  const renderFormPreviewEnunciated = () => enunciated.map((e) => (
    <FormPreviewEnunciated enunciated={e} />
  ));

  const renderFormPreviewQuestion = () => questionState.map((q) => (
    <FormPreviewQuestion question={q} />
  ));

  return (
    <div className="exercice">
      {loading ? <LoadingSearch /> : (
        <>
          <div className="form__input-header">
            <div>
              <div className="input-block__text">
                <h3>Titre : {inputValue.titre}</h3>
              </div>
              <div className="input-block__text">
                <div className="text-duree__seconde">
                  <h3>Durée :&nbsp;{minute} soit {inputValue.duree} secondes </h3>
                </div>
              </div>
            </div>
            <div className="button-footer">
              <div className="button-prev">
                <HTButton
                  onClick={() => history.push(`/technology/info/${id}`)}
                >
                  Retour
                </HTButton>
              </div>
            </div>
          </div>
          <div className="exercise__content">
            <div>
              <div className="exercice__title">
                <h3>Enoncés</h3>
              </div>
              <HTDivider />
              <div className="content__enunciated">
                <div>
                  {renderFormPreviewEnunciated()}
                </div>
              </div>
            </div>
            <div>
              <div className="exercice__title">
                <h3>Questions</h3>
              </div>
              <HTDivider />
              <div className="content__question">
                <div>
                  {renderFormPreviewQuestion()}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4>Laissez ici vos commentaires :</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
