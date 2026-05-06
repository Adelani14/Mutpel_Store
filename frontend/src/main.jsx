import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'

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

const router = createBrowserRouter([
  { path: '/', element: <Landing />},
  { path: '/landing', element: <Landing />},
  { path: '/login', element: <Login />},
  { path: '/signup', element: <Signup />},
  { path: '/admindashboard', element: <Admindashboard />},
  { path: '/productlisting', element: <Productlisting />},
  { path: '/productdetail', element: <Productdetail />},
  { path: '/cart', element: <Cart />},
  { path: '/checkout', element: <Checkout />},
  { path: '/newproduct', element: <Newproduct />},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </StrictMode>,
  )