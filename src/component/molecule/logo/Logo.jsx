/* eslint-disable linebreak-style */
import React from 'react';

import logo from '../../../assets/logo-ht.svg';

const Logo = ({ width, height }) => (
  <figure>
    <img src={logo} alt="logo" width={width ?? 150} height={height} />
  </figure>
);

export default Logo;
