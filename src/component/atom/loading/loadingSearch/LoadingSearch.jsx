/* eslint-disable linebreak-style */
import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

import './LoadingSearch.scss';

const LoadingSearch = () => (
  <div className="ht-loading">
    <MagnifyingGlass
      visible
      height="80"
      width="80"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="white"
      color="#51b06e"
    />
  </div>
);

export default LoadingSearch;
