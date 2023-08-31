import React, { useState } from 'react';
import { HTAvatar, HTClickAway, HTLogo } from '@hightao-dev/reactjs';

import './Header.style.scss';

import logo from '../../../assets/logo-ht.svg';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [img] = useState('');

  return (
    <div className="header">
      <div className="header__content">
        <div className="content__logo">
          <HTLogo logo={logo} />
        </div>
        <div className="content__avatar">
          <HTAvatar
            onClick={setOpenMenu}
            image={img}
          />
          {openMenu
          && (
            <HTClickAway onClickAway={() => setOpenMenu(false)}>
              <div className="avatar__menu">
                <button onClick={() => window.location.assign('/')} type="button">Deconnexion</button>
              </div>
            </HTClickAway>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
