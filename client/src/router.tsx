import { createBrowserRouter } from "react-router-dom"
import LoginPage from "./pages/login-page"
import userStore from "./stores/userStore";
import IndexPage from "./pages/index-page";

const router = createBrowserRouter([
    {
      path: "/",
      element: <IndexPage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>
    }
]);

export default router;