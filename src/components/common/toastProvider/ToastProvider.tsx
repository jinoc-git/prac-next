'use client';

import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export default function ToastProvider() {
  return (
    <ToastContainer
      bodyClassName={() => 'text-sm font-white p-3 flex items-center'}
      position="top-center"
      autoClose={1500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
      transition={Zoom}
    />
  );
}
