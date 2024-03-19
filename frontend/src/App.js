import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useInterceptor } from "./components/Helpers/AuthHelper";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "tailwindcss/tailwind.css";

import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";

import LandingPage from "./components/Pages/LandingPage";
import Test from "./components/PageComponents/test";
import Search from "./components/Pages/Search";
import Shop from "./components/Pages/Shop";
import Community from "./components/Pages/Community";
import Leaderboard from "./components/Pages/Leaderboard";
import Cart from "./components/Pages/Cart";
import Settings from "./components/Pages/Settings";
import Support from "./components/Pages/Support";
import About from "./components/Pages/About";
import Faq from "./components/Pages/Faq";
import Forgot from "./components/Pages/Forgot";
import Terms from "./components/Pages/Terms";
import Policy from "./components/Pages/Policy";

function App() {
  // useInterceptor();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />

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
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/policy" element={<Policy />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;