import React, { useState, useEffect } from 'react';
import {
  HTInputText,
  HTButton,
  HTAlert,
} from '@hightao-dev/reactjs';
import { useParams, useHistory } from 'react-router-dom';

import './Form.scss';

import inputValidator from '../../../../../config/validators/input/inputValidator';
import Config from '../../../../../config/config';

import {
  addOne,
  editOne,
  getOne,
  getAllType,
} from '../../../../../api/endpoint/technology/technologyApi';
import { getJWT } from '../../../../../service/storage/Storage.service';

import HTUpload from '../../../../atom/upload/HTUpload';
import LoadingSearch from '../../../../atom/loading/loadingSearch/LoadingSearch';
import InputSelect from '../../../../molecule/input/inputSelect/InputSelect';

const Form = () => {
  const [input, setInput] = useState({
    name: '',
    file: '',
    logo: '',
    type_technology: {
      type_technology: '',
      id: '',
    },
  });
  const [willEdit, setWillEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });
  const [typeTech, setTypeTech] = useState({});

  const [image, setImage] = useState('');
  const [fileName, setFileName] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    setLoading(true);
    const data = await getAllType(getJWT());
    setTypeTech(data.typesTechnology || []);

    if (id) {
      try {
        const res = await getOne(id, getJWT());
        const {
          name,
          logo,
        } = res.technology;
        setInput({
          ...input,
          name,
          file: `${Config.apiUrl}/${logo}`,
          type_technology: {
            type_technology: res.technology.type_technology.type_technology,
            id: res.technology.type_technology.id,
          },
        });
        setOldImage(`${Config.apiUrl}/${logo}`);
        setWillEdit(true);
      } catch (err) {
        setWillEdit(false);
      }
    }
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  const handleClickSubmit = async () => {
    const res = await addOne(input, getJWT());
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
    setOpen(true);
    setInput({
      name: '',
      file: '',
      logo: '',
      type_technology: {
        type_technology: '',
        id: '',
      },
    });
    setImage('');
  };

  const handleEdit = async () => {
    setWillEdit(false);
    const res = await editOne(id, input, getJWT());
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
    setOpen(true);
    setInput({
      name: '',
      file: '',
      logo: '',
      type_technology: {
        type_technology: '',
        id: '',
      },
    });
    setImage('');
    setOldImage('');
  };

  const handleClick = () => {
    if (willEdit) {
      handleEdit();
      return;
    }
    handleClickSubmit();
  };

  const convertBase64 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setImage(e.target.result);
      setFileName(file.name);
      setInput({ ...input, logo: file.name, file: e.target.result });
    };
  };

  const handleRemove = () => {
    setImage('');
    setFileName(input.file);
    setInput({
      ...input,
      file: oldImage,
    });
  };

  return (
    <div className="technology">
      <div className="technology__content">
        <div className="content__block">
          <div className="block__form">
            {loading ? <LoadingSearch /> : (
              <>
                <div className="form-input__select">
                  <InputSelect
                    onChange={(e, v) => setInput({
                      ...input,
                      type_technology: v || {
                        type_technology: '',
                        id: '',
                      },
                    })}
                    disableClearable={willEdit}
                    data={typeTech}
                    values={input.type_technology}
                    label="Type"
                    getOptionLabel={(o) => o.type_technology}
                  />
                </div>
                <div className="form-input__text">
                  <HTInputText
                    label="Name :"
                    name="name"
                    value={input.name}
                    validator={inputValidator(input.name, 0)}
                    onChange={handleChange}
                    error={!!(input.name && !inputValidator(input.name, 0))}
                  />
                </div>
                <div className="form-input__text">
                  <img
                    alt=""
                    name="logo"
                    src={input.file}
                    width="100"
                    height="100"
                  />
                </div>
                <div className="form-input__upload">
                  <HTUpload
                    image={image}
                    name={fileName}
                    onChange={(e) => convertBase64(e)}
                    onClose={handleRemove}
                  />
                </div>
              </>
            )}
          </div>
          <div className="form-input__block-btn">
            <div className="form-input__valid-btn">
              <HTButton
                onClick={handleClick}
                disabled={!!(!input.name && !inputValidator(input.name, 0))}
              >
                Enregistrer
              </HTButton>
            </div>
            <div className="form-input__return-btn">
              <HTButton
                onClick={() => history.push('/technology')}
              >
                Retour
              </HTButton>
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
        </div>
      </div>
    </div>
  );
};

export default Form;
