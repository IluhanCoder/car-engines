import { createBrowserRouter } from "react-router-dom"
import LoginPage from "./pages/login-page"
import userStore from "./stores/userStore";
import IndexPage from "./pages/index-page";
import ProjectPage from "./pages/project-page";
import ProjectsPage from "./pages/projects-page";

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
      path: "/project",
      element: <ProjectPage/>
    },
    {
      path: "/projects",
      element: <ProjectsPage/>
    }
]);

export default router;