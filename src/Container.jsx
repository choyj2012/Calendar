import "./Container.css"
import { getCalendar } from "./Calendar"

export default function Container() {
  return (
    <div className="container-box">
      <LeftContainer />
      <CenterContainer />
      <RightContainer />
    </div>
  )
}

const LeftContainer = () => {
  return <div className="container-left">Left</div>
}

const CenterContainer = () => {
  return (
    <div className="container-center">
      <Days />
      <Month/>
    </div>
  )
}

const Days = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div className="days">
      {days.map((day, i) => {
        let dayColor = 'weekday';
        if(i === 0) dayColor = 'sun';
        if(i === 6) dayColor = 'sat';
        return <div key={day} className={"day " + dayColor}>{day}</div>
      })}
    </div>
  )
}

const Month = () => {
  const cal = getCalendar(2023, 5);
  return (
    <div className="month">
      {cal.map((week, i) => {
          return <Week key={i} week={week}/>
        })}
    </div>
  )
}

const Week = ({week}) => {
  return (
    <div className="week">
      {week.map((date, i) => <Date key={i} date={date} day={i}/>)}
    </div>
  )
}

const Date = ({date, day}) => {
  let dayColor = 'weekday', numColor = 'basic';
  if(date.month !== 'curr') numColor = 'light';
  if(day === 0) dayColor = 'sun';
  if(day === 6) dayColor = 'sat';

  return (
    <div className="date">
      <div className={dayColor + ' ' + numColor}>
        {date.date}
      </div>
    </div>
  )
}
const RightContainer = () => {
  return <div className="container-right">Right</div>
}