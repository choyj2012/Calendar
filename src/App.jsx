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

  // <BrowserRouter>
	// 			<Header />
	// 			<Routes>
	// 				<Route path="/" element={<Main />}></Route>
	// 				<Route path="/product/*" element={<Product />}></Route>
	// 				{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
	// 				<Route path="*" element={<NotFound />}></Route>
	// 			</Routes>
	// 		</BrowserRouter>
}

export default App