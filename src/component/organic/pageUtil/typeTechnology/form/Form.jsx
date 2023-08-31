import React, { useState, useEffect } from 'react';
import { HTButton, HTAlert } from '@hightao-dev/reactjs';
import { useParams, useHistory } from 'react-router-dom';

import './Form.scss';

import inputValidator from '../../../../../config/validators/input/inputValidator';

import { addOne, editOne, getOne } from '../../../../../api/endpoint/typeTechnology/typeTechnologyApi';
import { getJWT } from '../../../../../service/storage/Storage.service';

import HTLoading from '../../../../atom/loading/HTLoading';
import InputText from '../../../../molecule/input/inputText/InputText';

const Form = () => {
  const [input, setInput] = useState('');
  const [willEdit, setWillEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    if (id) {
      try {
        setLoading(true);
        const res = await getOne(id, getJWT());
        const { type_technology: type } = res.typeTechnology;
        setInput(type);

        setLoading(false);
        setWillEdit(true);
      } catch (err) {
        setWillEdit(false);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
    setInput('');
  };

  const handleClose = (reason) => {
    if (reason === 'click') {
      return;
    }

    setOpen(false);
  };

  const handleClickSubmit = async () => {
    const res = await addOne({ type_technology: input }, getJWT());
    if (res.status === true) {
      setNotification({
        message: res.message,
        type: 'success',
      });
    } else if (res.status === false) {
      setNotification({
        message: res.message,
        type: 'info',
      });
    } else {
      setNotification({
        message: res.message,
        type: 'error',
      });
    }
    setNotification({
      message: res.message,
      type: 'success',
    });
    handleOpen();
  };

  const handleEdit = async () => {
    setWillEdit(false);
    const res = await editOne(id, { type_technology: input }, getJWT());
    if (res.status === true) {
      setNotification({
        message: res.message,
        type: 'success',
      });
    } else if (res.status === false) {
      setNotification({
        message: res.message,
        type: 'info',
      });
    } else {
      setNotification({
        message: res.message,
        type: 'error',
      });
    }
    setNotification({
      message: res.message,
      type: 'success',
    });
    handleOpen();
  };

  const handleClick = () => {
    if (willEdit) {
      handleEdit();
      return;
    }
    handleClickSubmit();
  };

  return (
    <div className="type">
      <div className="type__content">
        <div className="content__block">
          <div className="form-input__text">
            {loading ? <HTLoading /> : (
              <InputText
                label="Type technology :"
                name="type_technology"
                value={input}
                validator={inputValidator(input, 4)}
                onChange={handleChange}
                error={!!(input && !inputValidator(input, 4))}
              />
            )}
          </div>
          <div className="form-input__block-btn">
            <div className="form-input__valid-btn">
              <HTButton
                onClick={handleClick}
                disabled={!!(!input && !inputValidator(input, 4))}
              >
                Enregistrer
              </HTButton>
            </div>
            <div className="form-input__return-btn">
              <HTButton
                onClick={() => history.push('/type/technology')}
              >
                Retour
              </HTButton>
            </div>
          </div>
          <div>
            <HTAlert
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message={notification.message}
              severity={notification.type}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
