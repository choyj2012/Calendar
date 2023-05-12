import "./Container.css";
import { getCalendar } from "./Calendar";
import { useEffect, useState } from "react";

export default function Container({ ym, isLeftOpen }) {
  return (
    <div className="container-box">
      <LeftContainer isLeftOpen={isLeftOpen} />
      <CenterContainer ym={ym} />
      <RightContainer />
    </div>
  );
}

const LeftContainer = ({ isLeftOpen }) => {
  let className = "container-left";
  className += isLeftOpen ? " left-open" : "";
  return <div className={className}>Left</div>;
};

const CenterContainer = ({ ym: { year, month } }) => {
  const cal = getCalendar(year, month);
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
      <Month
        cal={cal}
        key={year + "" + month}
        selectedCord={selectedCord}
        setSelectedCord={setSelectedCord}
      />
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
        let selectedDate = false;
        if (selectedCord.isSelected && selectedCord.x === i)
          selectedDate = true;

        return (
          <Date
            key={i}
            weekNum={weekNum}
            date={date}
            day={i}
            setSelectedCord={setSelectedCord}
            selectedDate={selectedDate}
          />
        );
      })}
    </div>
  );
};

const Date = ({ weekNum, date, day, setSelectedCord, selectedDate }) => {
  let dayColor = "weekday",
    numColor = "basic";
  if (date.month !== "curr") numColor = "light";
  if (day === 0) dayColor = "sun";
  if (day === 6) dayColor = "sat";

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
      className={"date" + (selectedDate ? " selected-width" : "")}
      onClick={handleClick}
    >
      <div className={dayColor + " " + numColor}>{date.date}</div>
    </div>
  );
};
const RightContainer = () => {
  return <div className="container-right">Right</div>;
};
