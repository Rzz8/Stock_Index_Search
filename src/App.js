import { Landing, History } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Configure React Router for two pages: Landing and History
const router = createBrowserRouter([
  {
    // Landing page configuration
    path: "/",
    element: <Landing />,
  },
  {
    // History page configuration with a dynamic parameter ":id"
    path: "/history/:id",
    element: <History />,
  },
]);

// App component serves as the entry point and wraps the application with the RouterProvider
const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
