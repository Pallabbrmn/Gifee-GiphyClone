import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import { Home, Categories, Search, GifeePage, Favorites } from "./pages/Pages";
import GifProvider from "./context/GifContext";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:category",
          element: <Categories />,
        },
        {
          path: "/search/:query",
          element: <Search />,
        },
        {
          path: "/:type/:slug",
          element: <GifeePage />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
      ],
    },
  ]);
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
