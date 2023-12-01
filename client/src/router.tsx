import { createBrowserRouter } from "react-router-dom"
import LoginPage from "./pages/login-page"
import ProjectPage from "./pages/project-page";
import ProjectsPage from "./pages/projects-page";
import AuthProvider from "./components/auth-provider";

const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/project/:projectId",
      element: <AuthProvider><ProjectPage/></AuthProvider>
    },
    {
      path: "/projects",
      element: <AuthProvider><ProjectsPage/></AuthProvider>
    }
]);

export default router;