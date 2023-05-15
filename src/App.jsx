import Container from "./Container"
import Footer from "./Footer"
import Header from "./Header"
import "./App.css"
import { createContext, useMemo, useState } from "react"

export const CurrYmContext = createContext(null);

function App() {
  const [ym, setYM] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1
  })

  const [isLeftOpen, setIsLeftOpen] = useState(true);
  //const value = useMemo(() => ({ym, setYM}), [ym]);
  return (
    <div className="wrap">
      <CurrYmContext.Provider value={ym}>
        <Header setYM={setYM} setIsLeftOpen={setIsLeftOpen} />
        <Container isLeftOpen={isLeftOpen} />
      </CurrYmContext.Provider>
      <Footer />
    </div>
  );
}

export default App
