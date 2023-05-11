import "./Header.css";

export default function Header({ym, setYM}) {
  return (
    <header className="header-box">
      <HeaderContents ym={ym} setYM={setYM}/>
    </header>
  )
}

const HeaderContents = ({ym, setYM}) => {
  return (
    <div className="header-contents">
      <Logo />
      <Search ym={ym} setYM={setYM}/>
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

const Search = ({ym : {year, month}, setYM}) => {
  let today = `${year}년 ${month+1}월`;

  const onChangeMonth = (n) => {
    console.log("click");
    let newYM = {year, month};
    newYM.month += n;
    if(newYM.month > 11) newYM.year += 1;
    if(newYM.month < 0) newYM.year -= 1;
    newYM.month = (newYM.month + 12) % 12;
    setYM(newYM);
  }

  const goToday = () => {
    setYM({
      year: new Date().getFullYear(),
      month: new Date().getMonth()
    });
  }

  return (
    <div className="search-bar">
      <div className="sb-b">
        <button onClick={goToday}>Today</button>
        <button onClick={() => onChangeMonth(-1)}>{"<"}</button>
        <button onClick={() => onChangeMonth(1)}>{">"}</button>
        <div>{today}</div>
      </div>
      <div className="sb-b">
        <button>Search</button>
        <button>Setting</button>
        <select className="select-drop">
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