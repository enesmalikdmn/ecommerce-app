import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './contexts/AuthContext';
import { BasketProvider } from './contexts/BasketContext';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProtectedRoute from './pages/ProtectedRoute';
import AdminPanel from './pages/AdminPanel';

import { ReactQueryDevtools } from 'react-query/devtools'

import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query'
import Profile from './pages/Profile';
import Basket from './pages/Basket';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />, 
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp /> 
      },
      {
        path: "/profile",
        element: <ProtectedRoute />,
        children: [
          { path: "", element: <Profile /> },
        ],
      },
      {
        path: "/admin-panel",
        element: <ProtectedRoute />, // This is the route for admin
        children: [
          { path: "", element: <AdminPanel /> },
        ],
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <BasketProvider>
            <RouterProvider router={router} />  
          </BasketProvider>
        </AuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
