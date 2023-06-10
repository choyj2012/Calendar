import "./Container.css";
import { getCalendar } from "./Calendar";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { CurrYmContext } from "./MainPage";
import LeftContainer from "./LeftContainer";
import { getHolidayfromServer } from "./server/server";

export const selectedDateContext = createContext(null);

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

const SelectedDateProvider = ({children, isLeftOpen, setIsLeftOpen}) => {
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1,
    date: new Date().getDate(),
  });

  const onSelect = (date) => {
    if(!isLeftOpen) {
      setSelectedDate({...date});
      setIsLeftOpen(true);
    }
    else {
      if(JSON.stringify(selectedDate) === JSON.stringify(date))
        setIsLeftOpen(false);
      else
        setSelectedDate({...date});
    }
  }
  const value = [isLeftOpen, selectedDate, onSelect];

  return (
    <selectedDateContext.Provider value={value}>
      {children}
    </selectedDateContext.Provider>
  )
}

const holidayContext = createContext(null);

const CenterContainer = () => {
  const {year, month} = useContext(CurrYmContext);
  const cal = getCalendar(year, month-1);
  const [holiday, setHoliday] = useState(new Map());

  useEffect(() => {
    let ignore = false;
    async function fetchHoliday() {
      if(!ignore){
        setHoliday(await getHolidayfromServer(year, month, holiday));
      }
    }
    fetchHoliday();

    return () => {
      ignore = true;
    }
  }, [year, month]);

  return (
    <div className="container-center">
      <Days/>
      <holidayContext.Provider value={holiday}>
        <Month
          cal={cal}
          key={year + "" + month}
          />
      </holidayContext.Provider>
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
        return (
          <Week
            key={i}
            week={week}
          />
        );
      })}
    </div>
  );
};

const Week = ({ week }) => {
  return (
    <div className="week">
      {week.map((date, i) => {
        return (
          <DateComp
            key={i}
            date={date}
            day={i}
          />
        );
      })}
    </div>
  );
};

const DateComp = ({ date, day }) => {
  const {year, month} = useContext(CurrYmContext);
  const [isSelected, selectedDate, onSelect] = useContext(selectedDateContext);
  
  let className = ['weekday', 'light', 'date-num'];

  if (day === 0) className[0] = 'sun';
  else if (day === 6) className[0] = 'sat';
  else className[0] = 'weekday';

  const hol = useContext(holidayContext);
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
