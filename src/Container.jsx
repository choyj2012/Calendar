import "./Container.css"
import { getCalendar } from "./Calendar"

export default function Container({ym, isLeftOpen}) {
  return (
    <div className="container-box">
      <LeftContainer isLeftOpen={isLeftOpen}/>
      <CenterContainer ym={ym}/>
      <RightContainer />
    </div>
  )
}

const LeftContainer = ({isLeftOpen}) => {
  let className = 'container-left';
  className += isLeftOpen ? ' left-open' : '';
  return <div className={className}>Left</div>
}

const CenterContainer = ({ym : {year, month}}) => {
  const cal = getCalendar(year, month);
  return (
    <div className="container-center">
      <Days />
      <Month cal={cal}/>
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

const Month = ({cal}) => {
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