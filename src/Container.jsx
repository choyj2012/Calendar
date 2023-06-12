import "./Container.css";
import { getCalendar } from "./Calendar";
import { useContext, useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import { 
  HolidayContext, HolidayProvider, 
  SelectedDateContext, SelectedDateProvider,
  CurrYmContext } from "./Context";

export default function Container({ isLeftOpen, setIsLeftOpen }) {
  return (
    <div className="container-box">
      <SelectedDateProvider
          isLeftOpen={isLeftOpen}
          setIsLeftOpen={setIsLeftOpen}>
        <LeftContainer />
        <CenterContainer />
      </SelectedDateProvider>
      <RightContainer />
    </div>
  );
}

const CenterContainer = () => {
  const {ym: {year, month},} = useContext(CurrYmContext);
  const cal = getCalendar(year, month-1);
  
  return (
    <div className="container-center">
      <Days />
      <HolidayProvider>
        <Month cal={cal} key={year + "" + month} />
      </HolidayProvider>
    </div>
  );
};

const Days = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="days">
      {days.map((day, i) => {
        let dayColor = "weekday";
        if (i === 0) dayColor = "sun";
        if (i === 6) dayColor = "sat";

        return (
          <div key={day} className={"day " + dayColor}>
            {day}
          </div>
        );
      })}
    </div>
  );
};

const Month = ({ cal }) => {
  return (
    <div className="month">
      {cal.map((week, i) => {
        return <Week key={i} week={week} />;
      })}
    </div>
  );
};

const Week = ({ week }) => {
  return (
    <div className="week">
      {week.map((date, i) => {
        return <DateComp key={i} date={date} day={i} />;
      })}
    </div>
  );
};

const DateComp = ({ date, day }) => {
  const {ym: {year, month}, } = useContext(CurrYmContext);
  const [isSelected, selectedDate, onSelect] = useContext(SelectedDateContext);
  
  let className = ['weekday', 'light', 'date-num'];

  if (day === 0) className[0] = 'sun';
  else if (day === 6) className[0] = 'sat';
  else className[0] = 'weekday';

  const hol = useContext(HolidayContext);
  let holName = null;
  if(date.year == year && date.month == month && hol.has(date.date)){
    className[0] = 'sun';
    holName = hol.get(date.date);
  }
  
  if (date.month === month) className[1] = "basic";
  
  let tmp = new Date(date.year, date.month-1, date.date);
  if(tmp.toDateString() == new Date().toDateString()) className.push("today");
  
  const handleClick = () => {
    onSelect(date);
  };

  const isSelectedDate = (JSON.stringify(selectedDate) === JSON.stringify(date));

  return (
    <div
      className={"date " + (isSelected && isSelectedDate ? "selected-date" : "")}
      onClick={handleClick}
    >
      <div className={className.join(' ')}>{date.date}</div>
      <div className={className.join(' ')}>{holName}</div>
    </div>
  );
};

const RightContainer = () => {
  return <div className="container-right">Right</div>;
};
