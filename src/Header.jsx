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
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </div>
  )
}

const Logo = () => {
  return (
    <div style={{display: "flex"}}>
      <button>=</button>
      <h1>Calendar</h1>
    </div>
  )
}