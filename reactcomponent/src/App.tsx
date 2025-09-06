import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './component/sidebar/sidebar';
// import Header from './component/header/Header'; // ✅ import it
import Home from './pages/dashboard/Home';
import Profile from './pages/SignUp/SignUp';
import Settings from './pages/settings/Settings';
import Signup from './pages/SignUp/SignUp';
import LandingPage from './pages/landingpage/landingPage';
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <Router>
{/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
  <Header isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}

<div
  style={{
    marginLeft: isSidebarOpen ? '60px' : '60px',
    paddingTop: '64px',
    padding: '1rem',
    transition: 'margin-left 0.3s ease',
  }}
>
        <Routes>
    {/* <Route
  path="/"
  element={<Navigate to="/landing.html" replace />}
/> */}


        <Route path="/" element={<Navigate to="/LandingPage" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/LandingPage" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
