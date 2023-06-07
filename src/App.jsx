import MainPage from "./MainPage"
import Login from "./Login"
import { createBrowserRouter, RouterProvider} from "react-router-dom"

const routes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

function App() {

  const router = createBrowserRouter(routes, { basename: import.meta.env.DEV ? '/' : '/Calendar/' })
  return (
    <RouterProvider router={router} />
  );
}

export default App