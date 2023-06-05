import "./App.css"
import MainPage from "./MainPage"
import Login from "./Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<MainPage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App