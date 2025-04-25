import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Video, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center">
            <Video size={28} className="text-red-600 mr-2" />
            <span className="text-xl font-bold">YouTube</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
              placeholder="Search"
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        <div className="flex items-center">
          {user ? (
            <div className="flex items-center">
              <button className="p-2 mx-1 rounded-full hover:bg-gray-200 transition-colors">
                <Bell size={24} />
              </button>
              <div className="relative group ml-2">
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
                  {user.username.charAt(0).toUpperCase()}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block">
                  <div className="px-4 py-2 border-b">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center text-blue-600 border border-blue-600 rounded-full px-4 py-1.5 hover:bg-blue-50"
            >
              <User size={16} className="mr-2" />
              <span>Sign in</span>
            </Link>
          )}
        </div>
      </div>
      <form onSubmit={handleSearch} className="md:hidden px-4 py-2 border-t">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Search"
          />
          <button 
            type="submit" 
            className="absolute right-0 top-0 h-full px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;