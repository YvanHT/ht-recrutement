import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { HTLogo, HTAlert } from '@hightao-dev/reactjs';
import HTButtonAuthentication from '../../component/molecule/authenticationButton/HTButtonAuthentication';

import './Authentication.scss';

import google from '../../assets/google.svg';
import logo from '../../assets/logo-ht.svg';

import Config from '../../config/config';

import authGoogle from '../../api/endpoint/authentication/AuthenticationApi';
import { setJWT, setRole, setUser } from '../../service/storage/Storage.service';

const Authentification = () => {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });

  const handleRedirect = (res) => {
    if (res.token) {
      setJWT(res.token);
      // eslint-disable-next-line no-console
      console.log(res.token);
      setRole(res.user.role[0]);
      setUser(res.user.id);
      history.push('/candidate');
    } else {
      history.push('/');
      setLoading(false);
      setNotification({
        message: 'permission réfusé',
        type: 'error',
      });
      setOpen(true);
    }
  };

  const getGoogleInfo = async () => {
    const token = new URLSearchParams(location.hash).get('#access_token');
    if (token) {
      setLoading(true);
      try {
        const res = await authGoogle(token);
        handleRedirect(res);
      } catch (err) {
        setLoading(false);
        history.push('/');
      }
    }
  };

  useEffect(async () => {
    localStorage.clear();
    getGoogleInfo();
  }, []);

  const getUrl = (url, scope, resp, id, state) => `${url}?scope=${scope}&response_type=${resp}${state ? `&state=${state}` : ''}&client_id=${id}&redirect_uri=${Config.redirectUri}`;

  const handleGoogleAuth = async () => {
    const { googleEndPoint, googleClientId, googleScope } = Config;
    const url = getUrl(googleEndPoint, googleScope, 'token', googleClientId);
    window.location.assign(url);
  };

  return (
    <div className="authentification">
      {loading ? (
        <div className="authentification__loading">
          <p>Loading ...</p>
        </div>
      ) : (
        <>
          <div>
            <HTLogo logo={logo} />
          </div>
          <div className="authentification__admin">
            <div className="admin__title">
              <p>Espace Admin</p>
            </div>
            <div className="admin__text">
              <p>CONNECTEZ-VOUS</p>
            </div>
          </div>
          <div className="authentification__auth-button">
            <HTButtonAuthentication
              googleClick={handleGoogleAuth}
              googleImg={google}
              className="button-list__authentification"
            />
          </div>
        </>
      )}
      <div>
        <HTAlert
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message={notification.message}
          severity={notification.type}
        />
      </div>
    </div>
  );
};

export default Authentification;
