import HomePage from "@/page/home";
import MainLayout from "@/components/layouts/layout.main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404 from "@/components/layouts/layout.error404";
import LoginPage from "@/page/login";
import DrivePage from "@/page/drive";
import ManualPage from "@/page/manual";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/drive",
        element: <DrivePage />,
      },
      {
        path: "/manual",
        element: <ManualPage/>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Error404 />,
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
