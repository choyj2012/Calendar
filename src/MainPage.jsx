import Container from "./Container"
import Footer from "./Footer"
import Header from "./Header"
import { createContext, useMemo, useState } from "react"
import styled from "styled-components"
import "./App.css"

export const CurrYmContext = createContext(null);

const MainPage = () => {
  const [ym, setYM] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1
  })

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const value = useMemo(() => ym, [ym]);
  return (
    <Wrapper>
      <CurrYmContext.Provider value={value}>
        <Header setYM={setYM} setIsLeftOpen={setIsLeftOpen} />
        <Container isLeftOpen={isLeftOpen} setIsLeftOpen={setIsLeftOpen} />
      </CurrYmContext.Provider>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`
export default MainPage