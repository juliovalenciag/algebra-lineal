import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { MatrixProvider } from './context/MatrixContext.jsx';
import Matrices from './pages/Matrices.jsx';
import EspaciosV from './pages/EspaciosV.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/matrices',
    element: <Matrices />,
  },
  {
    path: '/espacios-vectoriales',
    element: <EspaciosV />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <MatrixProvider>
        <RouterProvider router={router} />
      </MatrixProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
