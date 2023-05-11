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

  const [isLeftOpen, setIsLeftOpen] = useState(true);

  return (
    <div className="wrap">
      <Header ym={ym} setYM={setYM} setIsLeftOpen={setIsLeftOpen}/>
      <Container ym={ym} isLeftOpen={isLeftOpen}/>
      <Footer />
    </div>
  )
}

export default App
