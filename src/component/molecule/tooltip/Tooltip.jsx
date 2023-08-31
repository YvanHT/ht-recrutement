import React, { useState } from 'react';
import './Tooltip.scss';

const Tooltip = ({ content, children, place }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div className="tooltip-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isTooltipVisible && <div className={`${place === 'right' ? 'tooltip-content-right' : 'tooltip-content-bottom'} ${(typeof content !== 'string') && 'tooltip-div'} `}>{content}</div>}
    </div>
  );
};

export default Tooltip;
