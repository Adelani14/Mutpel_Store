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
import Wishlist from './pages/Wishlist.jsx'
import Checkout from './pages/Checkout.jsx'
import Newproduct from './pages/Newproduct.jsx'
import Newcategory from './pages/NewCategory.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AllProduct from './pages/AllProduct.jsx';
import Profile from './pages/Profile.jsx';
import Search from './pages/Search.jsx';
import Categories from './pages/Categories.jsx';
import EditProduct from "./pages/EditProduct";
import ProductForm from './components/ProductForm.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import PaymentFailed from './pages/PaymentFailed.jsx'
import Order from './pages/Orders.jsx'
import OrderDetails from './pages/OrderDetails.jsx'



const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  { path: "/search", element: <Search /> },
  { path: "/categories/:id", element: <Categories /> },
  { path: "/categories", element: <Categories /> },
  { path: "/productlisting", element: <Productlisting /> },
  { path: "/productdetail/:id", element: <Productdetail /> },
  { path: "/payment-success", element: <PaymentSuccess /> },
  { path: "/order-success", element: <OrderSuccess /> },
  { path: "/payment-failed", element: <PaymentFailed /> },


  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      { path: "/admindashboard", element: <Admindashboard /> },
      { path: "/newproduct", element: <Newproduct /> },
      { path: "/newcategory", element: <Newcategory /> },
      { path: "/allproducts", element: <AllProduct /> },
      { path: "/editProduct/:id", element: <EditProduct /> },
      { path: "/productForm", element: <ProductForm /> },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["user", "admin"]} />,
    children: [


      { path: "/cart", element: <Cart /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/profile", element: <Profile /> },
      { path: "/orders", element: <Order /> },
      { path: "/orders/:id", element: <OrderDetails /> },


    ],
  },


]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)