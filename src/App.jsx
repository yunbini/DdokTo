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
import Login from './pages/Login';
import Register from './pages/Register';
import ChatBot from './pages/ChatBot';
import SentenChoiceRst from './pages/SentenChoiceRst';
import Onboarding from "./pages/Onboarding.jsx";
import Intro from "./pages/Intro.jsx";
import Outro from "./pages/Outro.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/Onboarding" element={<Onboarding />} />
            <Route path="/OnboardingLogin" element={<OnboardingLogin />} />
            <Route path="/OnboardingLogout" element={<OnboardingLogout />} />
            <Route path="/Intro" element={<Intro />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/WordMultiCho" element={<WordMultiChoice />} />
            <Route path="/MultiChoFalse" element={<MultiChoiceFalse />} />
            <Route path="/MultiChoSuc" element={<MultiChoiceSuc />}/>
            <Route path="/SentenMultiCho" element={<SentenMultiChoice />} />
            <Route path="/" element={<Onboarding />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/ChatBot" element={<ChatBot />} />
            <Route path="/SentenceRst" element={<SentenChoiceRst />} />
            <Route path="/Outro" element={<Outro />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
