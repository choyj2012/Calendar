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
      <Weeks />
      <Date/>
    </div>
  )
}

const Weeks = () => {
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div className="weeks">
      {week.map(day => {
        return <div key={day} className="week">{day}</div>
      })}
    </div>
  )
}

const Date = () => {
  const cal = getCalendar(2023, 5);
  return (
    <div className="date">
      {
        cal.map((date) => {
          return <Day date={date}/>
        })
      }
    </div>
  )
}

const Day = ({date}) => {
  return (
    <div className="day">
      <div>{date}</div>
    </div>
  )
}
const RightContainer = () => {
  return <div className="container-right">Right</div>
}