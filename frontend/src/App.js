import 'bootstrap/dist/css/bootstrap.min.css';

import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import LandingPage from './components/Auth/LandingPage';
import ForgotPass from './components/Auth/ForgotPass';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsPage from './components/settings/SettingsPage';
import HomePage from './components/Pages/HomePage';
import Sponsors from './components/Pages/Sponsors';
import Points from './components/Pages/Points';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotpass' element={<ForgotPass />} />
        <Route path='/accountsettings' element={<SettingsPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/sponsors' element={<Sponsors />} />
        <Route path='/points' element={<Points />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;