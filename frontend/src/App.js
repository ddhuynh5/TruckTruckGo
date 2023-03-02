import "bootstrap/dist/css/bootstrap.min.css"

import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Drivers from "./components/test/backend_test";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/drivers" element={<Drivers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
