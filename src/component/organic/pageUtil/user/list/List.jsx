/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import {
  HTButton, HTPagination, HTAlert,
} from '@hightao-dev/reactjs';

import './List.scss';

import { getList } from '../../../../../api/endpoint/user/userApi';
import { getJWT } from '../../../../../service/storage/Storage.service';

import CardNotFound from '../../../../molecule/card/cardNotFound/CardNotFound';
import CardUser from '../../../../molecule/card/cardUser/CardUser';
import InputText from '../../../../molecule/input/inputText/InputText';
import LoadingSearch from '../../../../atom/loading/loadingSearch/LoadingSearch';

let delayer;

const List = () => {
  const [inputValue, setInputValue] = useState('');
  const [rows, setRows] = useState([]);
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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      setProcessing(true);
      const data = await getList(getJWT(), {
        text: inputValue,
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

      if (!data.recruteurs) {
        setNotification({
          message: 'invalid request',
          type: 'warning',
        });
        setRows([]);
        return;
      }

      setRows(data.recruteurs.map((v) => ({
        id: v.id,
        avatar: v.profile,
        name: v.name,
        email: v.email,
        role: v.roles,
      })));

      setPagination({ ...pagination, limit: data.limit, total: data.nbPage });
    }, 1000);
  };

  const handleReset = () => {
    setInputValue('');
    setPagination({ ...pagination, page: 1 });
    setLoading(true);
  };

  const handlePageChange = (p, l) => {
    setPagination({ ...pagination, page: p, limit: l });
  };

  const renderUserRows = () => {
    if (rows.length === 0) return <CardNotFound />;
    return rows.map((user) => <CardUser user={user} path="user" />);
  };

  return (
    <div className="list">
      <div className="list__data-table">
        {loading ? (
          <LoadingSearch />
        ) : renderUserRows()}
      </div>
      <div className="list-input">
        <div className="list__input-flex">
          <div className="list__input-text">
            <InputText
              placeholder="Recherche par nom, email"
              iconEnd="search"
              value={inputValue}
              onChange={inputTextChange}
              name="text"
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
