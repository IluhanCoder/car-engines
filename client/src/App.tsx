import React, { useEffect } from 'react';
import { RouterProvider, useNavigate } from 'react-router-dom';
import router from './router';
import userService from './services/user-service';
import userStore from './stores/userStore';
import AuthProvider from './components/auth-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App h-full">
      <main>
          <RouterProvider router={router}/>
          <ToastContainer/>
      </main>
    </div>
  );
}

export default App;
