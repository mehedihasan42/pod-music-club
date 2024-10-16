import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
   RouterProvider,
} from "react-router-dom";
import './index.css'
import { router } from './Router/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <div className='left-0 ml-0 pl-0'>
      <AuthProvider>  
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
      </AuthProvider>
      </div>
  </React.StrictMode>,
)
