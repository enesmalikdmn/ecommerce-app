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
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Products from './pages/Products';

import App from './App';


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
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp /> 
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />  
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
