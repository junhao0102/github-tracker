import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Index from "@/pages/Index";
import Repository from "@/pages/Repository";

export default createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "projects/:repoName",
        element: <Repository />,
      },
    ],
  },
]);
