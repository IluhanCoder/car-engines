import { createBrowserRouter } from "react-router-dom"
import LoginPage from "./pages/login-page"
import userStore from "./stores/userStore";
import IndexPage from "./pages/index-page";
import CardPage from "./pages/card-page";

const router = createBrowserRouter([
    {
      path: "/",
      element: <IndexPage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/card",
      element: <CardPage/>
    }
]);

export default router;