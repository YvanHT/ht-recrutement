/* eslint-disable linebreak-style */
import React, { useState, createRef } from 'react';

import Logo from '../logo/Logo';
import MenuButton from '../menu/menuButton/MenuButton';
import MenuLink from '../menu/menuLink/MenuLink';
import MenuList from '../menu/MenuList';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const refs = createRef();

  return (
    <div
      ref={refs}
      className={`relative h-fit md:h-screen bg-[#f7f7f7] duration-300 ${
        isOpen ? 'w-full sm:w-4/5 md:w-1/4' : 'w-1/12 min-w-fit'
      }`}
    >
      <div
        className={`self-center ${
          isOpen ? 'px-7.5 py-10' : 'flex flex-col py-5 md:py-10 px-0'
        }`}
      >
        <MenuButton
          onClick={() => setIsOpen(!isOpen)}
          active={isOpen}
          className="self-start"
        />

        <div
          className={`flex justify-center self-center p-4 ${
            isOpen ? 'basis-20' : 'basis-26 hidden md:block'
          }`}
        >
          {isOpen && <Logo width={100} height={100} />}
        </div>

        <div className={`${isOpen ? '' : 'justify-center self-center pt-10 hidden md:block'}`}>
          {MenuList.map((m) => (
            <MenuLink
              classNameText={`${isOpen ? '' : 'hidden'}`}
              classNameRadio={`${isOpen ? '' : 'mx-4 my-4'}`}
              key={m.link}
              link={m.link}
              activator={m.activator}
              label={m.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
