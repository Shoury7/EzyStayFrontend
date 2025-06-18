import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Listings from "./Listings";
import SingleCard from "./SingleCard";
import Register from "./Register";
import Contact from "./Contact";
import ManageProperties from "./ManageProperties";
import UpdateListing from "./UpdateListing";
import Notfound from "./Notfound";
import { Feather } from "lucide-react";
import Features from "./Features";
import DashBoard from "./DashBoard";
const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Listings />,
    },

    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/manageproperties",
      element: <ManageProperties />,
    },
    {
      path: "/listings",
      element: <Listings />,
    },
    {
      path: "/listings/:id",
      element: <SingleCard />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/update",
      element: <UpdateListing />,
    },
    {
      path: "/features",
      element: <Features />,
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
