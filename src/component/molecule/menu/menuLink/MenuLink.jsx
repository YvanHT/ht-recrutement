/* eslint-disable eqeqeq */
import React from 'react';
import { useRouter } from 'next/router';
import Tooltip from '../Tooltip/Tooltip';

const MenuLink = ({ classNameText, classNameRadio, label, link, activator, disabled }) => {

  const root = useRouter();

  const activeLink = () => {
    if (root.pathname == link || root.pathname.startsWith(activator)) return 'text-[#17963E] underline underline-offset-8';
    return 'pb-2.5 rounded-b border-custom-primary text-black';
  };

  const LinkContent = () => (
    <div className="m-4 flex items-center">
      <span className={`text-center text-sm md:text-xl w-full  ${activeLink()} ${classNameText}`}>{label}</span>
      {renderTooltip()}  
    </div>
  );
  
  const renderTooltip = () => {
    if (classNameText !== 'hidden') return <input type="radio" className={`radio checked:bg-[#17963E] checked:border-white border-[#707070] radio-xs md:radio-sm ${classNameRadio}`} checked={root.pathname == link || root.pathname.startsWith(activator)} />;
    return <Tooltip content={label} place="right"><div><input type="radio" className={`radio checked:bg-[#17963E] checked:border-white border-[#707070] radio-xs md:radio-sm ${classNameRadio}`} checked={root.pathname == link || root.pathname.startsWith(activator)} /></div></Tooltip>;
  };

  const verifyDisabled = () => {
    if (disabled) return <div>{LinkContent()}</div>;

    return <><Link href={link}>{LinkContent()}</Link></>;
  };

  return verifyDisabled();
};

export default MenuLink;
