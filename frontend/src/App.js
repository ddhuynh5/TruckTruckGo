import 'bootstrap/dist/css/bootstrap.min.css'

import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import LandingPage from './components/Auth/LandingPage';
import ForgotPass from './components/Auth/ForgotPass';
import ForgotEmail from './components/Auth/ForgotEmail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsPage from './components/settings/SettingsPage';
import HomePage from './components/Pages/HomePage';
import Cart from './components/Pages/Cart';
import Sponsors from './components/Pages/Sponsors';
import Points from './components/Pages/Points';
import CatalogPage from './components/Pages/Products';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotpass' element={<ForgotPass />} />
        <Route path='/accountsettings' element={<SettingsPage />} />
        {/* <Route path='/forgotemail' element={<ForgotEmail />} /> */}
        <Route path='/home' element={<HomePage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/sponsors' element={<Sponsors />} />
        <Route path='/points' element={<Points />} />
        <Route path='/catalog' element={<CatalogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;