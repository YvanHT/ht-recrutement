/* eslint-disable linebreak-style */
import React from 'react';
import Config from '../../../../../../config/config';
import './FormPreviewQuestion.scss';
import InputTextarea from '../../../../../molecule/input/inputTextarea/InputTextarea';
import InputCheckbox from '../../../../../molecule/input/inputCheckbox/InputCheckbox';
import InputRadio from '../../../../../molecule/input/inputRadio/InputRadio';

const FormPreviewQuestion = ({ question }) => (
  <div className="question__content" key={question.id}>
    <span className="question__text">{question.question}  </span>
    {question.type === 'Question ouverte' ? (
      <div className="question__textarea">
        <InputTextarea />
      </div>
    ) : (
      <div className={question.reponses.some((reponse) => reponse.image) ? 'question__qcm-image' : ''}>
        {question.reponses.map((reponse) => (
          <div className="response__container">
            {(reponse.file || reponse.image) && (
              <img src={reponse.file ?? `${Config.apiUrl}/${reponse.image}`} alt={reponse.reponse} className={`response__figure ${reponse.etat ? 'response__figure-bordered' : ''}`} />
            )}
            {(question.type === 'QCM checkbox') ? (
              <InputCheckbox
                name={question.id}
                value={reponse.etat}
                checked={reponse.etat}
                label={reponse.reponse}
                disabled
              />
            ) : (
              <InputRadio
                name={question.id}
                value={reponse.etat}
                checked={reponse.etat}
                label={reponse.reponse}
                disabled
              />
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default FormPreviewQuestion;
