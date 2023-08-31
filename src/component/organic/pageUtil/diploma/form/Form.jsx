import React, { useState, useEffect } from 'react';
import { HTButton, HTAlert } from '@hightao-dev/reactjs';
import { useParams, useHistory } from 'react-router-dom';

import './Form.scss';

import inputValidator from '../../../../../config/validators/input/inputValidator';

import { addOne, editOne, getOne } from '../../../../../api/endpoint/diploma/diplomaApi';
import { getJWT } from '../../../../../service/storage/Storage.service';

import InputText from '../../../../molecule/input/inputText/InputText';
import LoadingSearch from '../../../../atom/loading/loadingSearch/LoadingSearch';

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
        const { name } = res.diploma;
        setInput(name);

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
    const res = await addOne({ name: input }, getJWT());
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
    const res = await editOne(id, { name: input }, getJWT());
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
    <div className="diploma">
      <div className="diploma__content">
        <div className="content__block">
          <div className="form-input__text">
            {loading ? <LoadingSearch /> : (
              <InputText
                label="Nom :"
                name="name"
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
                onClick={() => history.push('/diploma')}
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
