import React, { useState } from 'react';
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl';
import ClickAwayListener from 'react-click-away-listener';
import './InputDate.scss';

const InputDate = ({
  label,
  name,
  success,
  min,
  max,
  value,
  onChange,
  onSelectDate,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const toggleYearSelector = () => {
    setShowYearSelector(!showYearSelector);
  };

  let minDate = new Date();
  let maxDate = new Date();
  if (min) {
    minDate = new Date(min);
  }
  if (max) {
    maxDate = new Date(max);
  }

  const prevMonth = () => {
    setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  const prevYear = () => {
    setDate((prevDate) => new Date(prevDate.getFullYear() - 1, prevDate.getMonth()));
  };

  const nextYear = () => {
    setDate((prevDate) => new Date(prevDate.getFullYear() + 1, prevDate.getMonth()));
  };

  const selectYear = (year) => {
    setSelectedYear(year);
    const newDate = new Date(date);
    newDate.setFullYear(year);
    setDate(newDate);
    toggleYearSelector();
  };

  const selectDay = (day) => {
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${dayOfMonth}`;
    setSelectedDay(day);
    onSelectDate(formattedDate);
    toggleCalendar();
  };

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const isDateDisabled = (day) => {
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    if (min && selectedDate < minDate) {
      return true;
    }
    if (max && selectedDate > maxDate) {
      return true;
    }
    return false;
  };

  return (
    <div className={`container-date ${success ? 'success' : 'default'}`}>
      {label && (
      <span className="label">
        {label}
      </span>
      )}
      <input
        type="date"
        onClick={toggleCalendar}
        className="input"
        name={name}
        value={value}
        placeholder="jj/mm/aaaa"
        onChange={onChange}
        readOnly
      />
      {showCalendar && (
      <ClickAwayListener onClickAway={toggleCalendar}>
        <div className="calendar">
          <div className="calendar-header">
            <button type="button" className="btn-transparent" onClick={showYearSelector ? prevYear : prevMonth}>
              <SlArrowLeftCircle size={20} color="white" />
            </button>
            <button type="button" className="btn-transparent mr-2" onClick={toggleYearSelector}>
              <h3>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
            </button>
            <button type="button" className="btn-transparent" onClick={showYearSelector ? nextYear : nextMonth}>
              <SlArrowRightCircle size={20} color="white" />
            </button>
          </div>
          <div className="calendar-body">
            {showYearSelector ? (
              <div className="calendar-body__year">
                {[...Array(12)].map((_, index) => {
                  const year = date.getFullYear() - 6 + index;
                  return (
                    <button
                      key={year}
                      type="button"
                      className={`calendar-body__year-btn ${selectedYear === year ? 'clicked' : ''}`}
                      onClick={() => selectYear(year)}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="calendar-body__week">
                  <div className="calendar-body__week-day"><span>lu</span></div>
                  <div className="calendar-body__week-day"><span>ma</span></div>
                  <div className="calendar-body__week-day"><span>me</span></div>
                  <div className="calendar-body__week-day"><span>je</span></div>
                  <div className="calendar-body__week-day"><span>ve</span></div>
                  <div className="calendar-body__week-day"><span>Sa</span></div>
                  <div className="calendar-body__week-day"><span>Di</span></div>
                </div>
                <div className="calendar-body__date">
                  {[...Array(Math.ceil((daysInMonth + startingDay) / 7))].map((_, rowIndex) => (
                    <div key={`day-${Math.ceil((daysInMonth + startingDay) / 7) + rowIndex}`} className="calendar-body__date-container">
                      {[...Array(7)].map((__, colIndex) => {
                        const day = rowIndex * 7 + colIndex - startingDay + 1;
                        const isSelected = day === selectedDay;
                        const isDisabled = isDateDisabled(day);
                        return (
                          <div key={`day-${day}`} className="calendar-body__date-container-day">
                            {day > 0 && day <= daysInMonth && (
                            <button
                              type="button"
                              className={`calendar-body__date-container-day__btn ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                              onClick={() => !isDisabled && selectDay(day)}
                            >
                              <span>{day}</span>
                            </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

      </ClickAwayListener>
      )}
    </div>
  );
};

export default InputDate;
