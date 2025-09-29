import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import IndexPage from "@/pages/IndexPage"
import ProjectPage from "@/pages/ProjectPage";

export default createBrowserRouter([
  {
    path: "/",              
    element: <MainLayout />, 
    children: [
      { index: true, element: <IndexPage /> }, 
      {
        path: "projects/:repoName",
        element: <ProjectPage />,        
      },
    ],
  },
]);
