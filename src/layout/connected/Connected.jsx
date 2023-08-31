import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HTSidebar } from '@ht-kits/react';

import './Connected.scss';

import logo from '../../assets/logo-ht.svg';

import route from '../../service/route/route';
import Header from '../../component/molecule/header/Header';

const Connected = ({ children }) => (
  <BrowserRouter>
    <div className="connected">
      <HTSidebar
        link={route}
        logo={logo}
      />
      <div style={{ paddingLeft: '8vw' }}>
        <Header />
        {children}
      </div>
    </div>
  </BrowserRouter>
);

export default Connected;
