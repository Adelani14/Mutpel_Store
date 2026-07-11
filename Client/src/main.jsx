import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Admindashboard from './pages/Admindashboard.jsx'
import Productlisting from './pages/Productlisting.jsx'
import Productdetail from './pages/Productdetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Newproduct from './pages/Newproduct.jsx'
import Newcategory from './pages/NewCategory.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AllProduct from './pages/AllProduct.jsx';
import Profile from './pages/Profile.jsx';
import Search from './pages/Search.jsx';
import Categories from './pages/Categories.jsx';



const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },

  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      { path: "/admindashboard", element: <Admindashboard /> },
      { path: "/newproduct", element: <Newproduct /> },
      { path: "/newcategory", element: <Newcategory /> },
      { path: "/allproducts", element: <AllProduct /> },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["user", "admin"]} />,
    children: [
      { path: "/productlisting", element: <Productlisting /> },
      { path: "/productdetail/:id", element: <Productdetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/search", element: <Search /> },
      { path: "/categories", element: <Categories /> },
    ],
  },


]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)