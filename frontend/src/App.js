import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useInterceptor } from "./components/Auth/AuthHelper";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "tailwindcss/tailwind.css";

import ForgotPass from "./components/Auth/ForgotPass";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

import LandingPage from "./components/Pages/LandingPage";
import Test from "./components/Pages/test";
import Search from "./components/Pages/Search";
import Shop from "./components/Pages/Shop";
import Community from "./components/Pages/Community";
import Leaderboard from "./components/Pages/Leaderboard";
import Cart from "./components/Pages/Cart";
import Settings from "./components/Pages/Settings";
import Support from "./components/Pages/Support";
import About from "./components/Pages/About";
import Faq from "./components/Pages/Faq";

function App() {
  // useInterceptor();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/forgotpass" element={<ForgotPass />} />

          <Route path="/test" element={<Test />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/community" element={<Community />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;