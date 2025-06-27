import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/website/Home.tsx';
import Header from './Components/Header/header-portfolio.tsx';
import Login from './pages/auth/Login.tsx';
import SignUp from './pages/auth/Signup.tsx';
import AppLayout from './pages/app/AppLayout.tsx';
import Documentation from './pages/app/Documentation/documentation.tsx';
function AppRoutes() {
  const location = useLocation();

  // Hide header on login page
  const showHeader = location.pathname === '/' ;

  return (
    <>
      {showHeader && <Header /> }
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/:component?" element={<AppLayout />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </>
  );
}

export default AppRoutes; 