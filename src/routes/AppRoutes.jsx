import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Auth pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Forget from "../pages/Auth/Forget";

// Admin pages
import AdminLayout from "../components/layout/Adminayout";
import Dashboard from "../pages/admin/Dashboard";
import Order from "../pages/admin/Order";
import Teams from "../pages/admin/Teams";
import Report from "../pages/admin/Report";

// User pages
import UserLayout from "../pages/user/Userlayout";
import UserDashboard from "../pages/user/Userdashboard";
import UserOrder from "../pages/user/Userorder";
import PlaceOrder from "../pages/user/Placeorder";
import UserProducts from "../pages/user/Userproducts";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  
  { path: "/", element: <Home/> },
  {path:"/login",element:<Login/>},
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <Forget /> },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "order", element: <Order /> },
      { path: "teams", element: <Teams /> },
      { path: "reports", element: <Report /> },
      { path: "", element: <Navigate to="/admin/dashboard" replace /> },
    ],
  },

  {
    path: "/user",
    element: <UserLayout />,
    children: [
      { path: "dashboard", element: <UserDashboard /> },
      { path: "place-order", element: <PlaceOrder /> },
      { path: "orders", element: <UserOrder /> },
      { path: "userproducts", element: <UserProducts /> },
      { path: "", element: <Navigate to="/user/dashboard" replace /> },
    ],
  },
]);
