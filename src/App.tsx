import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex">
            {showSidebar && <Sidebar />}
            <main className={`flex-1 p-4 ${showSidebar ? 'ml-0 md:ml-64' : 'ml-0'}`}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/video/:videoId" element={<VideoPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;