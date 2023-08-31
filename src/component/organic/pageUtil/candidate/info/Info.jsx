/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { HTButton, HTAlert } from '@hightao-dev/reactjs';

import './Info.scss';
import resetIcon from '../../../../../assets/reset.svg';
import {
  getOne,
  downloadCv,
  getDownloadToken,
  reNew,
} from '../../../../../api/endpoint/candidate/candidateApi';

import { getJWT, getRole } from '../../../../../service/storage/Storage.service';
import Tooltip from '../../../../molecule/tooltip/Tooltip';

const Info = () => {
  const [info, setInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const getInfo = async () => {
    setLoading(true);
    const res = await getOne(getJWT(), id);
    if (res[0].candidate) {
      setLoading(false);
      setInfo(res[0].candidate);
    } else history.push('/candidate');
  };

  const reNewNote = async (candidateTechId) => {
    setLoading(true);
    const res = await reNew(getJWT(), candidateTechId);
    if (res) {
      setNotification({
        message: res.message,
        type: 'success',
      });
      getInfo();
      setOpen(true);
    } else history.push('/candidate');
  };

  const renderSpecialities = () => {
    if (info.candidateSpecialities) {
      return info.candidateSpecialities.map((v) => `${v.speciality.name} `);
    }

    return '-';
  };

  const renderProject = () => {
    if (info.projects && info.projects.length > 0) {
      const renderTask = (v) => v.map((k) => (
        <p>{`${k.technology.name} : ${k.description}`}</p>
      ));

      return info.projects.map((v) => {
        const start = new Date(v.start_date);
        const end = new Date(v.end_date);
        const opt = { month: 'long' };

        return (
          <div className="content__project">
            <p>
              {`${new Intl.DateTimeFormat('fr-Fr', opt)
                .format(start)} ${start.getFullYear()} - 
                ${new Intl.DateTimeFormat('fr-Fr', opt)
                .format(end)} ${end.getFullYear()} :
              `}
            </p>
            &nbsp;
            &nbsp;
            <p>
              {`${v.name} chez ${v.society || '-'}`}
              <br />
              <br />
              {v.description}
              {renderTask(v.tasks)}
            </p>
          </div>
        );
      });
    }

    return '';
  };

  const renderExp = () => {
    if (info.internshipAndExperiences && info.internshipAndExperiences.length > 0) {
      const renderTask = (v) => v.map((k) => (
        <p>{k.descriptionTask}</p>
      ));

      const renderTech = (v) => v.map((k) => `${k.technology.name} `);

      return info.internshipAndExperiences.map((v) => {
        const start = new Date(v.start_date);
        const end = new Date(v.end_date);
        const opt = { month: 'long' };

        return (
          <div className="content__project">
            <p>
              {`${new Intl.DateTimeFormat('fr-Fr', opt)
                .format(start)} ${start.getFullYear()} - 
                ${new Intl.DateTimeFormat('fr-Fr', opt)
                .format(end)} ${end.getFullYear()} :
              `}
            </p>
            &nbsp;
            &nbsp;
            <p>
              {`${v.post} chez ${v.society}`}
              {renderTask(v.taskExperiences)}
              {`Technologies : ${renderTech(v.technologyExperiences)}`}
            </p>
          </div>
        );
      });
    }

    return '';
  };

  const renderDiploma = () => {
    if (info.candidateDiplomas && info.candidateDiplomas.length > 0) {
      return info.candidateDiplomas.map((v) => {
        const date = new Date(v.date_obteined);

        return (
          <div className="content__project">
            <p>
              {`${new Date(date).getFullYear()} :`}
            </p>
            &nbsp;
            &nbsp;
            <p>
              {`${v.diploma.name} en ${v.entitled}`}
              <br />
              {`à ${v.school}`}
            </p>
          </div>
        );
      });
    }

    return '';
  };

  const renderLang = () => {
    if (info.candidateLanguages && info.candidateLanguages.length > 0) {
      return info.candidateLanguages.map((v) => (
        <div className="content__project">
          <p>{`${v.language.label} :`}</p>
            &nbsp;
            &nbsp;
          <p>{`niveau ${v.level.label}`}</p>
        </div>
      ));
    }

    return '';
  };

  const renderCompetence = () => {
    if (info.candidateTechnologies && info.candidateTechnologies.length > 0) {
      return info.candidateTechnologies.map((v) => (
        <div className="content__project" key={v.technology.id}>
          <p>{`${v.technology.type_technology.type_technology} :`}</p>
          &nbsp;
          &nbsp;
          <p>{`${v.technology.name} -- auto-eval : ${v.evaluation ? `${v.evaluation}/10` : 'n/a'} | qcm : ${v.note ? `${v.note}/10` : 'n/a'}`}</p>
          &nbsp;
          {(v.attempt === 0 && getRole() === 'SUPER_ADMIN') && (
            <div className="action-button">
              <Tooltip content="REINITIALISER">
                <button type="button" onClick={() => reNewNote(v.id)}>
                  <img src={resetIcon} alt="reset" />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      ));
    }

    return '';
  };

  const getCvLink = async () => {
    const res = await getDownloadToken(getJWT(), id);
    if (res.token) {
      window.open(downloadCv(res.token), '_blank');
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="w-full h-screen">
        <span>test</span>
      </div>
      <div className="info">
        {loading ? <span className="info__loading">Loading ...</span> : (
          <>
            <p className="info__title">{`${info.name} ${info.last_name}`}</p>
            <p className="info__subtitle">{info.post}</p>

            <p>{`Email :  ${info.email}`}</p>
            <p>{`Téléphone :  ${info.phone}`}</p>
            <p>{`Linkedin :  ${info.linkedin || '-'}`}</p>
            <p>{`Whatsapp :  ${info.whatsap || '-'}`}</p>
            <p>{`Skype :  ${info.skype || '-'}`}</p>
            <p>{`Facebook :  ${info.facebook || '-'}`}</p>
            <p>{`Github :  ${info.github || '-'}`}</p>
            <p>{`Gitlab :  ${info.gitlab || '-'}`}</p>
            <p>{`Specialite :  ${renderSpecialities()}`}</p>
            <p>{`Experience :  ${info.experience ? `${info.experience} ans` : '-'}`}</p>

            <div className="info__content">
              <p className="content__title">Projet</p>
              <hr />
              {renderProject()}
            </div>

            <div className="info__content">
              <p className="content__title">Experience professionel</p>
              <hr />
              {renderExp()}
            </div>

            <div className="info__content">
              <p className="content__title">Diplome et certification</p>
              <hr />
              {renderDiploma()}
            </div>

            <div className="info__content">
              <p className="content__title">Language</p>
              <hr />
              {renderLang()}
            </div>

            <div className="info__content">
              <p className="content__title">Competence</p>
              <hr />
              {renderCompetence()}
            </div>
          </>
        )}

      </div>
      <div className="info-btn">
        <div>
          <HTButton onClick={getCvLink}>Telecharger</HTButton>
        </div>
        <div>
          <HTButton onClick={() => history.push('/candidate')}>Retour</HTButton>
        </div>
      </div>
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
    </>
  );
};

export default Info;
