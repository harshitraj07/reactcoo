import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/dashboard/Home';
import Profile from './pages/SignUp/SignUp';
import Settings from './pages/settings/Settings';
import Signup from './pages/SignUp/SignUp';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    // 👇 Important: React app only runs under /app
    <Router basename="/app">
      <Routes>
        {/* React app routes */}
        <Route path="/" element={<Home />} />         {/* /app/ */}
        <Route path="/profile" element={<Profile />} /> {/* /app/profile */}
        <Route path="/signup" element={<Signup />} />   {/* /app/signup */}
        <Route path="/settings" element={<Settings />} /> {/* /app/settings */}

        {/* fallback: if route not found, go back to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
