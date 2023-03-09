import 'bootstrap/dist/css/bootstrap.min.css'

import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Drivers from './components/test/backend_test';
import LandingPage from './components/Auth/LandingPage';
import ForgotPass from './components/Auth/ForgotPass';
import ForgotEmail from'./components/Auth/ForgotEmail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsPage from './components/settings/SettingsPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/drivers' element={<Drivers />} />
        <Route path='/forgotpass' element={<ForgotPass />} />
        <Route path='/accountsettings' element={<SettingsPage />} />
        <Route path='/forgotemail' element={<ForgotEmail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;