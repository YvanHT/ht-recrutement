import React, { useState } from 'react';
import { HTInputText, HTLogo, HTButton } from '@ht-kits/react';
import { useHistory } from 'react-router-dom';

import './Authentification.scss';

import logo from '../../assets/logo-ht.svg';

import inputValidator from '../../config/validators/input/inputValidator';
import login from '../../api/endpoint/login/login';
import { setJWT } from '../../service/storage/Storage.service';

const Authentification = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    msg: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError({ ...error, state: false });
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await login(inputValue);
    if (res.token) {
      setJWT(res.token);
      history.push('/candidate');
    } else {
      setLoading(false);
      setError({ ...error, state: true, msg: 'Invalid username or password !' });
    }
  };

  const isDisabled = () => !!(
    loading || !inputValidator(inputValue.username, 0) || inputValue.password < 1
  );

  return (
    <div className="authentification">

      <div className="authentification__logo">
        <HTLogo logo={logo} />
      </div>

      <div className="authentification__form">

        <p className="form__title">Espace Admin</p>

        <div className="form__input-block">
          <HTInputText
            name="username"
            startIconText="person"
            placeholder="Username :"
            onChange={handleChange}
            error={!!(inputValue.username && !inputValidator(inputValue.username, 0))}
          />
        </div>
        <div className="form__input-block">
          <HTInputText
            name="password"
            placeholder="Password :"
            startIconText="vpn_key"
            onChange={handleChange}
            type="password"
          />
        </div>

        {error.state && (
          <div className="form__err_block"><p>{error.msg}</p></div>
        )}

        <div className="form__btn">
          <HTButton disabled={isDisabled()} onClick={handleSubmit} outlined>Connexion</HTButton>
        </div>

      </div>

    </div>
  );
};

export default Authentification;
