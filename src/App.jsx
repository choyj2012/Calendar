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

  const onChangeMonth = (n) => {
    console.log("click");
    let newYM = {...ym};
    newYM.month += n;
    if(newYM.month > 11) newYM.year += 1;
    if(newYM.month < 0) newYM.year -= 1;
    newYM.month = (newYM.month + 12) % 12;
    setYM(newYM);
  }

  return (
    <div className="wrap">
      <Header onChangeMonth={onChangeMonth} ym={ym}/>
      <Container ym={ym}/>
      <Footer />
    </div>
  )
}

export default App
