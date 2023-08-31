import React, { useState, useEffect } from 'react';
import {
  HTButton, HTAlert, HTPagination,
} from '@hightao-dev/reactjs';
import { useHistory } from 'react-router-dom';

import './List.scss';

import { getLang, deleteOne } from '../../../../../api/endpoint/language/languageApi';
import { getJWT } from '../../../../../service/storage/Storage.service';

import CardNameWithAction from '../../../../molecule/card/cardNameWithAction/CardNameWithAction';
import LoadingSearch from '../../../../atom/loading/loadingSearch/LoadingSearch';
import InputText from '../../../../molecule/input/inputText/InputText';
import CardNotFound from '../../../../molecule/card/cardNotFound/CardNotFound';

let delayer;

const List = () => {
  const [inputValue, setInputValue] = useState('');
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 1,
  });
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const cleanup = () => getListing();
    setLoading(false);

    return cleanup();
  }, [pagination.page, inputValue]);

  const inputTextChange = (e) => {
    setInputValue(e.target.value);
    setPagination({ ...pagination, page: 1, limit: 10 });
  };

  const getListing = async () => {
    if (processing) {
      return;
    }

    clearTimeout(delayer);

    delayer = setTimeout(async () => {
      setProcessing(true);
      setLoading(true);
      const data = await getLang(getJWT(), {
        language: inputValue,
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

      if (!data.languages) {
        setNotification({
          message: 'invalid request',
          type: 'warning',
        });
        setRows([]);
        return;
      }

      setRows(data.languages.map((v) => ({
        id: v.id,
        label: v.label,
      })));

      setPagination({ ...pagination, limit: data.limit, total: data.nbPage });
    }, 1000);
  };

  const handleReset = () => {
    setInputValue('');
    setPagination({ ...pagination, page: 1 });
    setLoading(true);
  };

  const handleRemove = (id) => async () => {
    const index = rows.findIndex((row) => row.id === id);

    if (index < 0) {
      return;
    }

    setLoading(true);
    const res = await deleteOne(id, getJWT());
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

    const data = [...rows];
    data.splice(index, 1);
    setRows(data);
  };

  const handlePageChange = (p, l) => {
    setPagination({ ...pagination, page: p, limit: l });
  };

  const renderRows = () => {
    if (rows.length === 0) return <CardNotFound />;
    return rows.map((row) => <CardNameWithAction data={row} path="diploma" handleRemove={handleRemove} />);
  };

  return (
    <div className="list">
      <div className="list__data-table">
        <div className="list__btn-block">
          <div className="list__add-btn">
            <HTButton success onClick={() => history.push('/language/form')}>Nouveau</HTButton>
          </div>
        </div>
        {loading ? <LoadingSearch /> : renderRows()}
      </div>
      <div className="list-input">
        <div className="list__input-flex">
          <div className="list__input-text">
            <InputText
              placeholder="Recherche par nom"
              iconEnd="search"
              value={inputValue}
              onChange={inputTextChange}
              name="language"
            />
          </div>
          <div className="list__reset-btn">
            <HTButton secondary onClick={handleReset}>Réinitialiser</HTButton>
          </div>
          <div className="list__pagination">
            <HTPagination
              maxPage={pagination.total}
              currentPage={pagination.page}
              onChange={handlePageChange}
            />
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
      </div>
    </div>
  );
};

export default List;
