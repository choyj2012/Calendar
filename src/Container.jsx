import "./Container.css";
import { getCalendar } from "./Calendar";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { CurrYmContext } from "./App";
import { getData } from "./Data/Data";

export default function Container({ isLeftOpen }) {
  return (
    <div className="container-box">
      <LeftContainer isLeftOpen={isLeftOpen} />
      <CenterContainer />
      <RightContainer />
    </div>
  );
}

const LeftContainer = ({ isLeftOpen }) => {
  let className = "container-left";
  className += isLeftOpen ? " left-open" : "";
  return <div className={className}>Left</div>;
};

const holidayContext = createContext(null);

const CenterContainer = () => {
  const {year, month} = useContext(CurrYmContext);
  const cal = getCalendar(year, month-1);
  const [holiday, setHoliday] = useState(new Map());

  useEffect(() => {
    let ignore = false;
    async function fetchHoliday() {
      if(!ignore){
        setHoliday(await getData(year, month, holiday));
      }
    }
    fetchHoliday();

    return () => {
      ignore = true;
    }
  }, [year, month]);

  const [selectedCord, setSelectedCord] = useState({
    isSelected: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setSelectedCord(cord => {
      let newCord = {...cord};
      newCord.isSelected = false;
      return newCord;
    })
  }, [year, month]);
  
  return (
    <div className="container-center">
      <Days selectedCord={selectedCord} />
      <holidayContext.Provider value={holiday}>
        <Month
          cal={cal}
          key={year + "" + month}
          selectedCord={selectedCord}
          setSelectedCord={setSelectedCord}
          />
      </holidayContext.Provider>
    </div>
  );
};

const Days = ({ selectedCord }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="days">
      {days.map((day, i) => {
        let dayColor = "weekday";
        if (i === 0) dayColor = "sun";
        if (i === 6) dayColor = "sat";
        if (selectedCord.isSelected && selectedCord.x === i)
          dayColor += " selected-width";
        return (
          <div key={day} className={"day " + dayColor}>
            {day}
          </div>
        );
      })}
    </div>
  );
};

const Month = ({ cal, selectedCord, setSelectedCord }) => {
  return (
    <div className="month">
      {cal.map((week, i) => {
        let selectedWeek = false;
        if (selectedCord.isSelected && selectedCord.y === i)
          selectedWeek = true;
        return (
          <Week
            key={i}
            week={week}
            weekNum={i}
            selectedCord={selectedCord}
            setSelectedCord={setSelectedCord}
            selectedWeek={selectedWeek}
          />
        );
      })}
    </div>
  );
};

const Week = ({
  week,
  weekNum,
  selectedCord,
  setSelectedCord,
  selectedWeek,
}) => {
  return (
    <div className={"week" + (selectedWeek ? " selected-height" : "")}>
      {week.map((date, i) => {
        let isSelectedDay = false;
        let isSelectedDate = false;
        if (selectedCord.isSelected && selectedCord.x === i){
          isSelectedDay = true;
          if(selectedWeek) isSelectedDate = true;
        }

        return (
          <DateComp
            key={i}
            weekNum={weekNum}
            date={date}
            day={i}
            setSelectedCord={setSelectedCord}
            isSelectedDay={isSelectedDay}
            isSelectedDate={isSelectedDate}
          />
        );
      })}
    </div>
  );
};

const DateComp = ({ weekNum, date, day, setSelectedCord, isSelectedDay, isSelectedDate }) => {
  const {year, month} = useContext(CurrYmContext);

  let className = ['weekday', 'light', 'date-num'];

  if (day === 0) className[0] = 'sun';
  if (day === 6) className[0] = 'sat';

  const hol = useContext(holidayContext);
  let holName = null;
  if(date.month == month && hol.has(date.date)){
    className[0] = 'sun';
    holName = hol.get(date.date);
  }
  
  if (date.month === month) className[1] = "basic";
  
  let tmp = new Date(date.year, date.month-1, date.date);
  if(tmp.toDateString() == new Date().toDateString()) className.push("today");
  
  const handleClick = () => {
    setSelectedCord((cord) => {
      let newCord = { ...cord };
      newCord.x = day;
      newCord.y = weekNum;
      newCord.isSelected =
        newCord.x === cord.x && newCord.y === cord.y
          ? !newCord.isSelected
          : true;
      return newCord;
    });
  };

  return (
    <div
      className={"date" + (isSelectedDay ? " selected-width" : "")}
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
