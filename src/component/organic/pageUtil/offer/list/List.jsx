import React, { useState, useEffect } from 'react';
import {
  HTButton,
  HTTable,
  HTAlert,
  HTPagination,
} from '@hightao-dev/reactjs';
import { useHistory } from 'react-router-dom';

import './List.scss';

import { getAll, deleteOne, getAllType } from '../../../../../api/endpoint/technology/technologyApi';
import { getJWT } from '../../../../../service/storage/Storage.service';

import Config from '../../../../../config/config';

import ActionButton from '../../../../molecule/actionButton/ActionButton';
import ShowButton from '../../../../molecule/showButton/ShowButton';
import HTLoading from '../../../../atom/loading/HTLoading';
import InputText from '../../../../molecule/input/inputText/InputText';
import InputSelect from '../../../../molecule/input/inputSelect/InputSelect';

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
    limit: 2,
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
      ...(type && { type: type.id }),
      page: pagination.page,
      limit: 2,
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
    setPagination({ ...pagination, page: 1, limit: 2 });
  };

  const inputSelectChange = (key, val) => {
    setInputValue({ ...inputValue, [key]: val });
    setPagination({ ...pagination, page: 1, limit: 2 });
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
        limit: 2,
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
    setInputValue('');
    setPagination({ ...pagination, page: 1 });
    setLoading(true);
  };

  const renderNameRow = (l) => {
    const { name } = l;
    return (<div>{name}</div>);
  };

  const renderLogoRow = (l) => {
    const { logo } = l;
    return (<img width="40" height="40" src={`${Config.apiUrl}/${logo}`} alt={logo} />);
  };

  const handleRemove = (id) => async () => {
    const index = rows.findIndex(() => id);

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

  const renderActionRow = (l) => {
    const { id } = l;
    return (
      <div className="button">
        <div className="show_button">
          <ShowButton
            path="technology"
            show={id}
          />
        </div>
        <div className="action_button">
          <ActionButton
            path="technology"
            editId={id}
            onRemove={handleRemove(id)}
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
    );
  };

  return (
    <div className="list">
      <div className="flex__input">
        <div className="input-combobox__content">
          <InputSelect
            label="Type :"
            value={inputValue.type}
            items={techType}
            getOptionLabel={(o) => o.type_technology}
            onChange={(e, v) => inputSelectChange('type', v)}
          />
        </div>
        <div className="input-text__content">
          <InputText
            placeholder="Recherche par nom"
            endIcon="search"
            value={inputValue.name}
            onChange={inputTextChange('name')}
            name="name"
          />
        </div>
        <div className="list__reset-btn">
          <HTButton secondary onClick={handleReset}>Réinitialiser</HTButton>
        </div>
      </div>

      <div className="list__btn-block">
        <div className="list__add-btn">
          <HTButton success onClick={() => history.push('/offer/form')}>Nouveau</HTButton>
        </div>
      </div>

      <div className="list__data-table">
        {loading ? <HTLoading /> : (
          <HTTable
            data={rows}
            headRenders={[
              { key: 'logo', render: () => <div>Logo</div> },
              { key: 'name', render: () => <div>Name</div> },
              { key: 'actions', render: () => <div>Actions</div> },
            ]}
            lineRenders={[
              { render: renderLogoRow },
              { render: renderNameRow },
              { render: renderActionRow },
            ]}
          />
        )}
        <div className="list__pagination">
          <HTPagination
            maxPage={pagination.total}
            currentPage={pagination.page}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
