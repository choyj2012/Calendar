import "./Header.css";
import { CurrYmContext } from "./MainPage";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Header({setYM, setIsLeftOpen}) {
  return (
    <header className="header-box">
      <HeaderContents setYM={setYM}
        setIsLeftOpen={setIsLeftOpen}
        />
    </header>
  )
}

const HeaderContents = ({setYM, setIsLeftOpen}) => {
  return (
    <div className="header-contents">
      <Logo setIsLeftOpen={setIsLeftOpen}/>
      <Search setYM={setYM}/>
      <UserMenu />
    </div>
  )
}

const Logo = ({setIsLeftOpen}) => {
  const handleLeftMenu = () => setIsLeftOpen(p => !p);
  return (
    <div className="logo">
      <button className="left-menu-btn"
        onClick={handleLeftMenu}
        >=
      </button>
      <h1>Calendar</h1>
    </div>
  )
}

const Search = ({setYM}) => {
  const {year, month} = useContext(CurrYmContext);
  let today = `${year}년 ${month}월`;

  const onChangeMonth = (n) => {
    let newYM = {year, month};
    newYM.month += n;
    if(newYM.month > 12) newYM.year += 1;
    if(newYM.month < 1) newYM.year -= 1;
    newYM.month = (newYM.month + 11) % 12 + 1;
    setYM(newYM);
  }

  const goToday = () => {
    setYM({
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1
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
  const [userName, setUserName] = useState(sessionStorage.getItem('user'));
  const moveLogin = useNavigate();
  const handleClick = () => {
    if(userName === null){
      moveLogin('/login');
    }
    else {
      sessionStorage.removeItem('user');
      setUserName(null);
      window.location.reload();
    }
  }
  return (
    <div className="user-menu">
      <div className="user-icon">
        {userName !== null ? 'Hi, ' + userName : 'login please'}
      </div>
      <div className="menu-icon" onClick={handleClick}>
        {
          userName === null
          ? 'login'//<Link to="/login">login</Link>
          : 'logout'
        }
        {/* <a href="/login">
          <img src="https://placehold.co/40x40"/>
        </a> */}
      </div>
    </div>
  )
}