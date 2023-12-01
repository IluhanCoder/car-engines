import { createBrowserRouter } from "react-router-dom"
import LoginPage from "./pages/login-page"
import ProjectPage from "./pages/project-page";
import ProjectsPage from "./pages/projects-page";
import AuthProvider from "./components/auth-provider";
import RegisterPage from "./pages/register-page";

const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthProvider><ProjectsPage/></AuthProvider>
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/registration",
      element: <RegisterPage/>
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