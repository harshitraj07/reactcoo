// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/SignUp/SignUp";
import Signup from "./pages/SignUp/SignUp";

const RedirectToLanding = () => {
  window.location.href = "/landing.html"; // ✅ goes straight to public/landing.html
  return null;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ this loads landing.html from public */}
        <Route path="/" element={<RedirectToLanding />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
