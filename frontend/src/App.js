import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import LandingPage from './components/Auth/LandingPage';
import ForgotPass from './components/Auth/ForgotPass';
import SettingsPage from './components/settings/SettingsPage';
import HomePage from './components/Pages/HomePage';
import Sponsors from './components/Pages/Sponsors';
import Points from './components/Pages/Points';
import { useInterceptor } from './components/Auth/AuthHelper';
import { ToastContainer } from 'react-toastify';


function App() {
  useInterceptor();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgotpass' element={<ForgotPass />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/sponsors' element={<Sponsors />} />
          <Route path='/points' element={<Points />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;