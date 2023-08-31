/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import {
  HTButton, HTPagination, HTAlert,
} from '@hightao-dev/reactjs';
import './List.scss';

import { getList } from '../../../../../api/endpoint/candidate/candidateApi';
import { getJWT } from '../../../../../service/storage/Storage.service';
import { getAll } from '../../../../../api/endpoint/technology/technologyApi';
import { getAllDiploma } from '../../../../../api/endpoint/diploma/diplomaApi';

import CardCandidate from '../../../../molecule/card/cardCandidate/CardCandidate';
import CardNotFound from '../../../../molecule/card/cardNotFound/CardNotFound';
import InputText from '../../../../molecule/input/inputText/InputText';
import InputSelect from '../../../../molecule/input/inputSelect/InputSelect';
import LoadingSearch from '../../../../atom/loading/loadingSearch/LoadingSearch';

let delayer;

const candidatType = [
  {
    id: '1',
    name: 'Candidature à un offre',
  },
  {
    id: '0',
    name: 'Candidature spontanée',
  },
];
const List = () => {
  const [inputValue, setInputValue] = useState({
    text: '',
    techno: null,
    diploma: null,
    state: null,
  });
  const [rows, setRows] = useState([]);
  const [techList, setTechList] = useState([]);
  const [diplomaList, setDiplomaList] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 1,
  });
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const {
      text, techno, diploma, state,
    } = inputValue;

    setLoading(true);
    const cleanup = () => getListing({
      ...(text && { text }),
      ...(techno && { technology: techno }),
      ...(diploma && { diploma }),
      ...(state && { status: state }),
      page: pagination.page,
      limit: 10,
    });
    setLoading(false);

    return cleanup();
  }, [
    pagination.page,
    inputValue,
    techList,
    diplomaList,
  ]);

  useEffect(() => {
    Promise.all([
      getAll(getJWT()),
      getAllDiploma(getJWT()),
    ]).then(([t, d]) => {
      if (t instanceof Error === false) {
        setTechList(t.technologies || []);
      }

      if (d instanceof Error === false) {
        setDiplomaList(d.diplomas || []);
      }
    });
  }, []);

  const inputTextChange = (key) => ({ target }) => {
    setInputValue({ ...inputValue, [key]: target.value });
    setPagination({ ...pagination, page: 1, limit: 10 });
  };

  const inputSelectChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
    setPagination({ ...pagination, page: 1, limit: 10 });
  };

  const getListing = async (params) => {
    if (processing) {
      return;
    }

    clearTimeout(delayer);

    delayer = setTimeout(async () => {
      setProcessing(true);
      setLoading(true);
      const data = await getList(getJWT(), params, {
        page: pagination.page,
        limit: 10,
      });

      setLoading(false);
      setProcessing(false);

      if (data instanceof Error) {
        setNotification({
          message: data.message,
          type: 'warning',
        });
        setRows([]);
        return;
      }

      if (!data.candidates) {
        setNotification({
          message: 'invalid request',
          type: 'warning',
        });
        setRows([]);
        return;
      }
      setRows(data.candidates.map((v) => ({
        id: v.id,
        avatar: v.profile,
        name: `${v.name} ${v.last_name}`,
        email: v.email,
        poste: v.post,
        date: new Intl.DateTimeFormat('fr-Fr').format(new Date(v.dateInscription)),
        state: v.status,
        role: v.role,
        candidateTechnologies: v.candidate_technologies,
      })));
      setPagination({ ...pagination, limit: data.limit, total: data.nbPage });
    }, 1000);
  };

  // TODO: use npm `date-fns` for handling date
  const handleReset = () => {
    setInputValue({
      text: '',
      startDate: '',
      endDate: '',
      techno: '',
      diploma: '',
      state: '',
      lang: '',
    });
    setLoading(true);
    setPagination({ ...pagination, page: 1, limit: 10 });
  };

  const handlePageChange = (p) => {
    setPagination({ ...pagination, page: p });
  };

  const renderCandidateRows = () => {
    if (rows.length === 0) return <CardNotFound />;
    return rows.map((candidate) => <CardCandidate candidate={candidate} path="candidate" />);
  };

  return (
    <div className="list">
      <div className="list__data-table">
        {loading ? (
          <LoadingSearch />
        ) : renderCandidateRows()}
      </div>
      <div className="list-input">
        <div className="list__input-text">
          <InputText
            placeholder="Recherche par nom, email, poste, ecole"
            iconEnd="search"
            value={inputValue.text}
            onChange={inputTextChange('text')}
            name="text"
          />
        </div>
        <div className="list__input-flex">
          <div className="input-flex__content">
            <InputSelect
              label="Type de candidature :"
              name="type"
              value={inputValue.techno}
              data={candidatType}
              onChange={(e) => inputSelectChange(e)}
            />
          </div>
          <div className="input-flex__content">
            <InputSelect
              label="Offre :"
              name="offer"
              value={inputValue.diploma}
              data={diplomaList}
              onChange={(e) => inputSelectChange(e)}
            />
          </div>
        </div>
        <div className="list__input-flex">
          <div className="input-flex__content">
            <InputSelect
              label="Technologie :"
              name="techno"
              value={inputValue.techno}
              data={techList}
              onChange={(e) => inputSelectChange(e)}
            />
          </div>
          <div className="input-flex__content">
            <InputSelect
              label="Diplome :"
              name="diploma"
              value={inputValue.diploma}
              data={diplomaList}
              onChange={(e) => inputSelectChange(e)}
            />
          </div>
        </div>
        <div className="list__input-flex">
          <div className="input-flex__content">
            <InputSelect
              label="Note :"
              name="note"
              value={inputValue.diploma}
              data={diplomaList}
              onChange={(e) => inputSelectChange(e)}
            />
          </div>
          <div className="list__reset-btn">
            <HTButton secondary onClick={handleReset}>Réinitialiser</HTButton>
          </div>
        </div>
        <div className="list__pagination">
          <HTPagination
            maxPage={pagination.total}
            currentPage={pagination.page}
            onChange={handlePageChange}
          />
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
    </div>
  );
};

export default List;
