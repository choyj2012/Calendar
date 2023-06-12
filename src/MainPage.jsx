import Container from "./Container"
import Footer from "./Footer"
import Header from "./Header"
import { createContext, useMemo, useState } from "react"
import styled from "styled-components"
import "./App.css"
import { CurrYmProvider } from "./Context"

export const CurrYmContext = createContext(null);

const MainPage = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  
  return (
    <Wrapper>
      <CurrYmProvider>
        <Header setIsLeftOpen={setIsLeftOpen} />
        <Container isLeftOpen={isLeftOpen} setIsLeftOpen={setIsLeftOpen} />
      </CurrYmProvider>
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