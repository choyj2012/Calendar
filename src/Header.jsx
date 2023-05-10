import "./Header.css";

export default function Header() {
  return (
    <header className="header-box">
      <HeaderContents />
    </header>
  )
}

const HeaderContents = () => {
  return (
    <div className="header-contents">
      <Logo />
      <Search />
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

const Search = () => {
  let today = new Date().toLocaleDateString('ko-kr');
  return (
    <div className="search-bar">
      <div className="sb-b">
        <button>Today</button>
        <button>{"<"}</button>
        <button>{">"}</button>
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