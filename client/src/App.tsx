import React, { useEffect } from 'react';
import { RouterProvider, useNavigate } from 'react-router-dom';
import router from './router';
import userService from './services/user-service';
import userStore from './stores/userStore';
import AuthProvider from './components/auth-provider';

function App() {
  return (
    <div className="App h-full">
      <header>
        this is header
      </header>
      <main>
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
      </main>
    </div>
  );
}

export default App;
