import './App.css';
import React from 'react';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import OnboardingLogin from './pages/OnboardingLogin';
import OnboardingLogout from './pages/OnboardingLogout';
import Category from './pages/Category';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/OnboardingLogin" element={<OnboardingLogin />} />
            <Route path="/OnboardingLogout" element={<OnboardingLogout />} />
            <Route path="/Category" element={<Category />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
