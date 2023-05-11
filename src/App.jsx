import Container from "./Container"
import Footer from "./Footer"
import Header from "./Header"
import "./App.css"
import { useState } from "react"

function App() {
  const [ym, setYM] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  })

  return (
    <div className="wrap">
      <Header ym={ym} setYM={setYM}/>
      <Container ym={ym}/>
      <Footer />
    </div>
  )
}

export default App
