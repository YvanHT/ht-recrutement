import React, { useState, useEffect } from 'react';
import {
  HTButton,
  HTAlert,
  HTPagination,
} from '@hightao-dev/reactjs';
import { useHistory } from 'react-router-dom';

import './List.scss';

import { getAll, deleteOne, getAllType } from '../../../../../api/endpoint/technology/technologyApi';
import { getJWT } from '../../../../../service/storage/Storage.service';

import InputText from '../../../../molecule/input/inputText/InputText';
import CardNotFound from '../../../../molecule/card/cardNotFound/CardNotFound';
import InputSelect from '../../../../molecule/input/inputSelect/InputSelect';
import LoadingSearch from '../../../../atom/loading/loadingSearch/LoadingSearch';
import CardTechnology from '../../../../molecule/card/cardTechno/CardTechnology';

let delayer;

const List = () => {
  const [inputValue, setInputValue] = useState({
    name: '',
    type: null,
  });
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
  const [techType, setTechType] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const { name, type } = inputValue;
    const cleanup = () => getListing({
      ...(name && { name }),
      ...(type && { type }),
      page: pagination.page,
      limit: 10,
    });

    return cleanup();
  }, [pagination.page, inputValue, techType]);

  useEffect(async () => {
    setLoading(true);
    const data = await getAllType(getJWT());
    setLoading(false);
    if (data) {
      setTechType(data.typesTechnology || []);
    }
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
      const data = await getAll(getJWT(), params, {
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

      if (!data.technologies) {
        setNotification({
          message: 'invalid request',
          type: 'warning',
        });
        setRows([]);
        return;
      }

      setRows(data.technologies.map((v) => ({
        id: v.id,
        name: v.name,
        logo: v.logo,
      })));

      setPagination({ ...pagination, limit: data.limit, total: data.nbPage });
    }, 1000);
  };

  const handleReset = () => {
    setInputValue({
      name: '',
      type: '',
    });
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

    const data = [...rows];
    data.splice(index, 1);
    setRows(data);
    setOpen(true);
  };

  const handlePageChange = (p, l) => {
    setPagination({ ...pagination, page: p, limit: l });
  };

  const renderRows = () => {
    if (rows.length === 0) return <CardNotFound />;
    return rows.map((row) => <CardTechnology technology={row} path="technology" handleRemove={handleRemove} />);
  };

  return (
    <div className="list">
      <div className="list__data-table">
        <div className="list__btn-block">
          <div className="list__add-btn">
            <HTButton success onClick={() => history.push('/technology/form')}>Nouveau</HTButton>
          </div>
        </div>
        {loading ? <LoadingSearch /> : renderRows()}
      </div>
      <div className="list-input">
        <div className="input-text__content">
          <InputText
            placeholder="Recherche par nom"
            iconEnd="search"
            value={inputValue.name}
            onChange={inputTextChange('name')}
            name="name"
          />
        </div>
        <div className="list__input-flex">
          <div className="input-flex__content">
            <InputSelect
              label="Type :"
              name="type"
              value={inputValue.type}
              data={techType}
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
