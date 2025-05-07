import './App.css';
import React from 'react';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import OnboardingLogin from './pages/OnboardingLogin';
import OnboardingLogout from './pages/OnboardingLogout';
import Category from './pages/Category';
import MultiChoiceFalse from './pages/MultiChoiceFalse';
import MultiChoiceSuc from './pages/MultiChoiceSuc';
import WordMultiChoice from './pages/WordMultiChoice';
import SentenMultiChoice from './pages/SentenMultiChoice';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/OnboardingLogin" element={<OnboardingLogin />} />
            <Route path="/OnboardingLogout" element={<OnboardingLogout />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/WordMultiCho" element={<WordMultiChoice />} />
            <Route path="/MultiChoFalse" element={<MultiChoiceFalse />} />
            <Route path="/MultiChoSuc" element={<MultiChoiceSuc />}/>
            <Route path="/SentenMultiCho" element={<SentenMultiChoice />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
