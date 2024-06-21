import React from 'react';
import ReactDOM from 'react-dom/client';
// axios-instance.js
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import './styles/index.scss';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

axios.defaults.baseURL = 'http://localhost:3000/';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName="testtest"
      containerStyle={{
        fontSize: '1.5rem',
      }}
      toastOptions={{
        duration: 3000,
        style: {
          boxShadow: 'rgba(0, 0, 0, 0.8) 0px 19px 38px',
          border: '1px solid red',
          marginTop: '400px',
          fontSize: '1.3rem',
          background: 'white',
          color: 'red',
        },
      }}
    />
    <RouterProvider router={router} />
  </div>
);
