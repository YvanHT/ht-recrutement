/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import {
  HTButton,
  HTAlert,
  HTDivider,
  HTSpinner,
} from '@hightao-dev/reactjs';
import { useHistory, useParams } from 'react-router-dom';
import ClickAwayListener from 'react-click-away-listener';
import { BiSolidHide } from 'react-icons/bi';
import Config from '../../../../../config/config';
import './Form.scss';
import showIcon from '../../../../../assets/showIcon.svg';
import InputTextarea from '../../../../molecule/input/inputTextarea/InputTextarea';
import InputMarkdown from '../../../../molecule/input/inputMarkdown/InputMarkdown';
import inputValidator from '../../../../../config/validators/input/inputValidator';

import {
  addOne,
  deleteReponse,
  deleteQuestion,
  getOne,
  editOne,
} from '../../../../../api/endpoint/exercise/ExerciseApi';
import {
  getJWT,
  getUser,
} from '../../../../../service/storage/Storage.service';

import HTUpload from '../../../../atom/upload/HTUpload';
import FormPreviewQuestion from './formPreview/FormPreviewQuestion';
import Tooltip from '../../../../molecule/tooltip/Tooltip';
import InputRadio from '../../../../molecule/input/inputRadio/InputRadio';
import InputCheckbox from '../../../../molecule/input/inputCheckbox/InputCheckbox';
import FormPreviewEnunciated from './formPreview/FormPreviewEnunciated';
import InputText from '../../../../molecule/input/inputText/InputText';
import InputSelect from '../../../../molecule/input/inputSelect/InputSelect';
import LoadingSearch from '../../../../atom/loading/loadingSearch/LoadingSearch';

const questionType = [
  {
    type: 'QCM radio',
  },
  {
    type: 'QCM checkbox',
  },
  {
    type: 'Question ouverte',
  },
];

const baseUrl = Config.apiUrl;

const Form = () => {
  const { id, ids } = useParams();

  const history = useHistory();

  const [previewEnunciated, setPreviewEnunciated] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState(false);

  const [inputValue, setInputValue] = useState({
    titre: '',
    duree: 0,
    status: '',
    questions: [
      {
        id: null,
        question: '',
        type: '',
        rate: null,
        reponses: [
          {
            reponse: '',
            etat: false,
            name: '',
            file: null,
          },
        ],
      },
    ],
    enunciated: '',
  });

  const [willEdit, setWillEdit] = useState(false);
  const [choiceStatus, setChoiceStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [minute, setMinute] = useState('');
  const [questionState, setQuestionState] = useState([
    {
      id: null,
      question: '',
      type: '',
      rate: null,
      reponses: [
        {
          reponse: '',
          etat: false,
          name: '',
          file: null,
        },
      ],
    },
  ]);

  useEffect(async () => {
    setLoading(true);
    if (ids) {
      try {
        const res = await getOne(ids, getJWT());
        const {
          titre,
          duree,
          status,
          questions: questionData,
          enunciated,
          owner,
        } = res.exercice;
        if (parseInt(getUser(), 10) !== owner.id) {
          history.push(`/exercice/comment/${id}/${ids}`);
        }
        setInputValue({
          ...inputValue,
          titre,
          duree,
          status,
          questions: questionData,
          enunciated,
        });
        setQuestionState(questionData);
        setWillEdit(true);
      } catch (err) {
        setWillEdit(false);
      }
    }
    setLoading(false);
  }, [ids]);

  const handleClickSubmit = async (updatedInputValue) => {
    setSpinner(true);
    const res = await addOne(id, { ...updatedInputValue }, getJWT());
    if (res.status === true) {
      setNotification({
        message: res.message,
        type: 'success',
      });
    }
    if (res.status === false) {
      setNotification({
        message: res.message,
        type: 'info',
      });
      return;
    }
    if (res.status instanceof Error) {
      setNotification({
        message: 'invalid request',
        type: 'warning',
      });
      return;
    }
    setChoiceStatus(false);
    setSpinner(false);
    setOpen(true);
    setInputValue({
      titre: '',
      duree: 0,
      status: '',
      type: '',
      questions: [
        {
          id: null,
          question: '',
          type: '',
          rate: null,
          reponses: [
            {
              reponse: '',
              etat: false,
              name: '',
              file: null,
            },
          ],
        },
      ],
      enunciated: '',
    });
    setQuestionState([
      {
        id: null,
        question: '',
        type: '',
        rate: 0,
        reponses: [
          {
            id: 0,
            reponse: '',
            etat: false,
            name: '',
            file: null,
          },
        ],
      },
    ]);
    history.push(`/exercice/form/${id}`);
  };

  const handleEdit = async (updatedInputValue) => {
    setWillEdit(false);
    setSpinner(true);
    const res = await editOne(ids, updatedInputValue, getJWT());
    setLoading(false);
    if (res.status === true) {
      setNotification({
        message: res.message,
        type: 'success',
      });
    }
    if (res.status === false) {
      setNotification({
        message: res.message,
        type: 'info',
      });
      return;
    }
    if (res.status instanceof Error) {
      setNotification({
        message: 'invalid request',
        type: 'warning',
      });
      return;
    }
    setChoiceStatus(false);
    setSpinner(false);
    setOpen(true);
    setInputValue({
      titre: '',
      duree: 0,
      status: false,
      type: '',
      questions: [
        {
          id: null,
          question: '',
          type: '',
          reponses: [
            {
              reponse: '',
              etat: false,
              name: '',
              file: null,
            },
          ],
        },
      ],
      enunciated: '',
    });
    history.push(`/exercice/form/${id}/${ids}`);
  };

  const handleStatusChange = (event) => {
    const updatedInputValue = { ...inputValue, status: event.target.value };
    setInputValue(updatedInputValue);

    if (willEdit) {
      handleEdit(updatedInputValue);
      return;
    }
    handleClickSubmit(updatedInputValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue(() => ({ ...inputValue, [name]: value }));
  };

  const handlePreviewEnunciated = () => {
    setPreviewEnunciated((prev) => !prev);
  };

  const handlePreviewQuestion = () => {
    setPreviewQuestion((prev) => !prev);
  };

  const isDisabled = () => {
    const valid = inputValidator;
    const {
      titre, duree, questions, enunciated,
    } = inputValue;

    const s = questions.length > 0
      ? questions.map((q) => !!(q.question && valid(q.question, 0)))
      : [true];

    const hasEmptyResponses = questions.some(
      (q) => q.reponses.length === 0 ?? q.reponses.some((r) => !r.reponse),
    );
    return !!(
      !duree
      || !valid(titre, 0)
      || s.includes(false)
      || !valid(enunciated, 0)
      || hasEmptyResponses
    );
  };

  const convertHMS = (value) => {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${hours} : ${minutes} : ${seconds}`;
  };

  useEffect(() => {
    const val = convertHMS(inputValue.duree);
    setMinute(val);
  }, [inputValue.duree]);

  const renderFormPreviewQuestion = () => questionState.map(
    (q) => <FormPreviewQuestion question={q} />,
  );

  const removeQuestions = async (i, ide) => {
    const remove = questionState.filter((q, index) => i !== index);
    if (!ide) {
      setQuestionState(remove);
    } else {
      const res = await deleteQuestion(ide, getJWT());
      if (res.status) {
        setQuestionState(remove);
        setInputValue({ ...inputValue, enunciateds: remove });
      }
    }
  };

  const addQuestion = () => {
    setQuestionState([
      ...questionState,
      {
        id: null,
        question: '',
        type: '',
        reponses: [
          {
            id: null,
            reponse: '',
            etat: false,
            name: '',
            file: null,
          },
        ],
      },
    ]);
  };

  const handleChangeQuestion = (index) => (e) => {
    const updatedQuestions = [...questionState];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      question: e.target.value,
    };
    setInputValue({ ...inputValue, questions: updatedQuestions });
    setQuestionState(updatedQuestions);
  };

  const inputSelectChange = (index) => (e) => {
    const updatedQuestions = [...questionState];
    let rate = 0;
    if (e.target.value === 'QCM radio') {
      rate = 1;
    } else if (e.target.value === 'Question ouverte') {
      rate = 10;
    }
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      type: e.target.value,
      rate,
    };
    setInputValue({ ...inputValue, questions: updatedQuestions });
    setQuestionState(updatedQuestions);
  };

  const renderAddedQuestion = () => questionState.map((q, i) => (
    <>
      {i > 0 && (
      <div className="input-block__text">
        <HTDivider />
      </div>
      )}
      <div key={`key_${i * 1}`} className="form-enunciated">
        <div className="input-block__text">
          {questionState.length > 1 ? (
            <InputTextarea
              onChange={handleChangeQuestion(i)}
              label="Question :"
              name="question"
              value={q.question}
              iconButton="remove"
              iconButtonClick={() => removeQuestions(i, q.id)}
            />
          ) : (
            <InputTextarea
              onChange={handleChangeQuestion(i)}
              label="Question :"
              name="question"
              value={q.question}
            />
          )}
          {q.rate && (<span>noté sur {q.rate}</span>)}
        </div>
        <div className="input-block__text">
          <InputSelect
            label="Types de question :"
            value={q.type}
            data={questionType}
            defaultValue={q.type}
            getOptionLabel={(o) => o.type || q.type}
            onChange={inputSelectChange(i)}
            disableClearable={willEdit}
          />
        </div>
        {q.type && q.type !== 'Question ouverte' && (
        <div className="input-block__text">
          {q.reponses.map((r, j) => (
            <div key={`key_${j * 1}`} style={{ marginBottom: '1.3rem' }}>
              <div className="form__input-block">
                <div className="input-block__text">
                  <InputText
                    label={`Réponse ${j + 1} :`}
                    value={r.reponse}
                    iconButton="remove"
                    onChange={inputReponseChange(i, j)}
                    iconButtonClick={() => removeReponse(i, j, r.id)}
                  />
                </div>
                <div className="input-block__text">
                  {q.type === 'QCM checkbox' ? (
                    <InputCheckbox
                      label={`Bonne réponse ${j + 1}`}
                      value={r.etat}
                      onChange={inputEtatChange(i, j)}
                      checked={r.etat}
                      name={`key_${i * 1}`}
                    />
                  ) : (
                    <InputRadio
                      label={`Bonne réponse ${j + 1}`}
                      value={r.etat}
                      onChange={inputEtatRadioChange(i, j)}
                      checked={r.etat}
                      name={`key_${i * 1}`}
                    />
                  )}
                </div>
                {(r.file || r.image) && (
                  <div className="form-input__text">
                    <img
                      alt=""
                      name="logo"
                      src={r.file ?? `${baseUrl}/${r.image}`}
                      width="100"
                      height="100"
                    />
                  </div>
                )}
                <div className="form-input__upload">
                  <HTUpload
                    name={r.name}
                    onChange={handleUploadResponse(i, j)}
                  />
                </div>
              </div>
            </div>
          ))}
          <HTButton onClick={() => addReponse(i)}>
            Ajouter une réponse
          </HTButton>
        </div>
        )}
      </div>
    </>
  ));

  const removeReponse = async (i, j, ide) => {
    const updatedQuestions = questionState.map((q, index) => {
      if (i === index) {
        const updatedReponses = q.reponses.filter((r, k) => j !== k);
        return { ...q, reponses: updatedReponses };
      }
      return q;
    });

    if (!ide) {
      setQuestionState(updatedQuestions);
    } else {
      const res = await deleteReponse(ide, getJWT());
      if (res.status) {
        setQuestionState(updatedQuestions);
        setInputValue((prevInputValue) => ({
          ...prevInputValue,
          questions: updatedQuestions,
        }));
      }
    }
  };

  const addReponse = (i) => {
    const add = questionState.map((q, index) => {
      if (i === index) {
        q.reponses.push({
          reponse: '',
          etat: false,
          name: '',
          file: null,
        });
      }
      return q;
    });
    setQuestionState(add);
  };

  const inputReponseChange = (i, j) => (e) => {
    const updatedQuestions = questionState.map((q, index) => {
      if (i === index) {
        const updatedReponses = [...q.reponses];
        updatedReponses[j] = { ...updatedReponses[j], reponse: e.target.value };
        return { ...q, reponses: updatedReponses };
      }
      return q;
    });
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      questions: updatedQuestions,
    }));
    setQuestionState(updatedQuestions);
  };

  const handleUploadResponse = (i, j) => (event) => {
    const updatedQuestions = questionState.map((q, index) => {
      if (i === index) {
        const updatedReponses = [...q.reponses];
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          updatedReponses[j] = {
            ...updatedReponses[j],
            file: e.target.result,
            name: file.name,
          };
        };
        return { ...q, reponses: updatedReponses };
      }
      return q;
    });
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      questions: updatedQuestions,
    }));
    setQuestionState(updatedQuestions);
  };

  const inputEtatChange = (i, j) => (e) => {
    const updatedQuestions = questionState.map((q, index) => {
      if (i === index) {
        const updatedReponses = [...q.reponses];
        updatedReponses[j] = { ...updatedReponses[j], etat: e.target.checked };
        const rate = updatedReponses.filter((r) => r.etat === true).length;
        return { ...q, reponses: updatedReponses, rate };
      }
      return q;
    });
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      questions: updatedQuestions,
    }));
    setQuestionState(updatedQuestions);
  };

  const inputEtatRadioChange = (i, j) => (e) => {
    const updatedQuestions = questionState.map((q, index) => {
      if (i === index) {
        const updatedReponses = q.reponses.map((rep, repIndex) => {
          if (j === repIndex) return { ...rep, etat: e.target.checked };
          return { ...rep, etat: false };
        });
        return { ...q, reponses: updatedReponses };
      }
      return q;
    });
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      questions: updatedQuestions,
    }));
    setQuestionState(updatedQuestions);
  };

  const renderChoiceStatus = () => choiceStatus && (
    <ClickAwayListener onClickAway={() => setChoiceStatus(false)}>
      <div className="content__status">
        <InputRadio
          label="Brouillon"
          name="status"
          value="brouillon"
          checked={inputValue.status === 'brouillon'}
          onChange={handleStatusChange}
        />
        <InputRadio
          label="En revue"
          name="status"
          value="revue"
          checked={inputValue.status === 'revue'}
          onChange={handleStatusChange}
        />
        <InputRadio
          label="Publié"
          name="status"
          value="publié"
          checked={inputValue.status === 'publié'}
          onChange={handleStatusChange}
        />
      </div>
    </ClickAwayListener>
  );

  return (
    <div className="exercice">
      {loading ? (
        <LoadingSearch />
      ) : (
        <>
          <div className="form__input-header">
            <div>
              <div className="input-block__text">
                <InputText
                  onChange={handleChange}
                  label="Titre :"
                  name="titre"
                  value={inputValue.titre}
                  validator={inputValidator(inputValue.titre, 0)}
                  error={
                    !!(inputValue.titre && !inputValidator(inputValue.titre, 0))
                  }
                />
              </div>
              <div className="input-block__time">
                <div className="text-duree__seconde">
                  <InputText
                    type="number"
                    onChange={handleChange}
                    name="duree"
                    label="Durée (en seconde) :"
                    value={inputValue.duree}
                  />
                </div>
                <div className="text-duree___minute">
                  <InputText
                    onChange={handleChange}
                    label="Total:"
                    value={minute}
                    disabled
                  />
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
              <div className="button-next">
                <HTButton
                  onClick={() => setChoiceStatus(true)}
                  disabled={isDisabled() || spinner || choiceStatus}
                >
                  Enregistrer
                </HTButton>
                {spinner ? (
                  <div className="block-btn__spinner">
                    <HTSpinner />
                  </div>
                ) : renderChoiceStatus()}
              </div>
            </div>
          </div>
          <div className="exercise__content">
            <div>
              <div className="exercice__title">
                <h3>Enoncés</h3>
                <div className="show-button">
                  {previewEnunciated ? (
                    <Tooltip content="CACHER">
                      <button
                        onClick={handlePreviewEnunciated}
                        type="button"
                        data-tip="cacher"
                      >
                        <BiSolidHide size={25} />
                      </button>
                    </Tooltip>
                  ) : (
                    <Tooltip content="VISUALISER">
                      <button
                        onClick={handlePreviewEnunciated}
                        type="button"
                        data-tip="visualiser"
                      >
                        <img src={showIcon} alt="show" />
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
              <HTDivider />
              <div className="content__enunciated">
                {previewEnunciated ? (
                  <FormPreviewEnunciated enunciated={inputValue.enunciated} />
                ) : (
                  <InputMarkdown
                    onChange={handleChange}
                    name="enunciated"
                    value={inputValue.enunciated}
                  />
                )}
              </div>
            </div>
            <div>
              <div className="exercice__title">
                <h3>Questions</h3>
                <div className="show-button">
                  <Tooltip content="VISUALISER">
                    <button
                      onClick={handlePreviewQuestion}
                      type="button"
                      data-tip="visualiser"
                    >
                      <img src={showIcon} alt="show" />
                    </button>
                  </Tooltip>
                </div>
              </div>
              <HTDivider />
              <div className="content__question">
                {previewQuestion ? (
                  <div>{renderFormPreviewQuestion()}</div>
                ) : (
                  <div className="form__input-block">
                    {renderAddedQuestion()}
                    <div className="input-block__text">
                      <HTButton onClick={() => addQuestion()}>
                        Ajouter une question
                      </HTButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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

export default Form;
