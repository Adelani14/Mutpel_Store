import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from "./pages/NotFound.jsx";
import PrintInvoice from "./pages/PrintInvoice";
import ProductForm from './components/ProductForm.jsx'


import Productlisting from './pages/UserPages/Productlisting.jsx'
import Productdetail from './pages/UserPages/Productdetail.jsx'
import PaymentSuccess from './pages/UserPages/PaymentSuccess.jsx';
import Cart from './pages/UserPages/Cart.jsx'
import Wishlist from './pages/UserPages/Wishlist.jsx'
import Search from './pages/UserPages/Search.jsx';
import Categories from './pages/UserPages/Categories.jsx';
import OrderSuccess from './pages/UserPages/OrderSuccess.jsx';
import PaymentFailed from './pages/UserPages/PaymentFailed.jsx'
import Order from './pages/UserPages/Orderspage.jsx'
import OrderDetails from './pages/UserPages/OrderDetails.jsx'
import Checkout from './pages/UserPages/Checkout.jsx'


import Admindashboard from './pages/AdminPages/Admindashboard.jsx'
import AdminOrderPage from "./pages/AdminPages/AdminOrderPage.jsx";
import AdminOrderDetails from "./pages/AdminPages/AdminOrderDetails.jsx";
import Newproduct from './pages/AdminPages/Newproduct.jsx'
import AllProduct from './pages/AdminPages/AllProduct.jsx';
import Newcategory from './pages/AdminPages/NewCategory.jsx'
import EditProduct from "./pages/AdminPages/EditProduct";






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
  { path: "*", element: <NotFound /> },


  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      { path: "/admindashboard", element: <Admindashboard /> },
      { path: "/newproduct", element: <Newproduct /> },
      { path: "/newcategory", element: <Newcategory /> },
      { path: "/allproducts", element: <AllProduct /> },
      { path: "/editProduct/:id", element: <EditProduct /> },
      { path: "/productForm", element: <ProductForm /> },
      { path: "/admin/orders/:id/invoice", element: < PrintInvoice /> },
      { path: "/allorders", element: <AdminOrderPage /> },
      { path: "/admin/orders/:id/invoice", element: < PrintInvoice /> },
      { path: "/adminorderdetails/:id", element: < AdminOrderDetails /> },

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