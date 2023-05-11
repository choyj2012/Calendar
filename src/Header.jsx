import "./Header.css";

export default function Header({onChangeMonth, ym}) {
  return (
    <header className="header-box">
      <HeaderContents onChangeMonth={onChangeMonth} ym={ym}/>
    </header>
  )
}

const HeaderContents = ({onChangeMonth, ym}) => {
  return (
    <div className="header-contents">
      <Logo />
      <Search onChangeMonth={onChangeMonth} ym={ym}/>
      <UserMenu />
    </div>
  )
}

const Logo = () => {
  return (
    <div className="logo">
      <button className="left-menu-btn">=</button>
      <h1>Calendar</h1>
    </div>
  )
}

const Search = ({onChangeMonth, ym : {year, month}}) => {
  let today = `${year}년 ${month+1}월`;
  return (
    <div className="search-bar">
      <div className="sb-b">
        <button>Today</button>
        <button onClick={() => onChangeMonth(-1)}>{"<"}</button>
        <button onClick={() => onChangeMonth(1)}>{">"}</button>
        <div>{today}</div>
      </div>
      <div className="sb-b">
        <button>Search</button>
        <button>Setting</button>
        <select>
          <option value="month">월</option>
        </select>
      </div>
    </div>
  );
}

const UserMenu = () => {
  return (
    <div className="user-menu">
      <div className="menu-icon">
        <img src="https://placehold.co/40x40"/>
      </div>
      <div className="user-icon">
        <img src="https://placehold.co/40x40"/>
      </div>
    </div>
  )
}