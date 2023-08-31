/* eslint-disable linebreak-style */
import React from 'react';
import { RiMenu5Fill, RiCloseFill } from 'react-icons/ri';

const MenuButton = ({ active, onClick, className }) => {
  const renderIcon = () => {
    if (active) {
      (
        <button
          type="button"
          className="border-transparent w-[50px] h-12"
          onClick={onClick}
        >
          <RiCloseFill size={50} />
        </button>
      );
    }
    return (
      <div className="self-center">
        <button
          type="button"
          className="border-transparent w-[50px] h-12"
          onClick={onClick}
        >
          <RiMenu5Fill size={50} color="#7E7E7E" />
        </button>
      </div>
    );
  };

  return (
    <div
      className={`w-full flex cursor-pointer flex-col ${className}`}
    >
      {renderIcon()}
    </div>
  );
};

export default MenuButton;
