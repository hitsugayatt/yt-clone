import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, Clapperboard, Flame, Music, Gamepad2, Trophy, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const mainLinks = [
    { icon: <Home size={20} />, text: 'Home', path: '/' },
    { icon: <Compass size={20} />, text: 'Explore', path: '/explore' },
    { icon: <PlaySquare size={20} />, text: 'Subscriptions', path: '/subscriptions' },
  ];

  const secondaryLinks = [
    { icon: <Clock size={20} />, text: 'Watch Later', path: '/playlist?list=WL' },
    { icon: <ThumbsUp size={20} />, text: 'Liked Videos', path: '/playlist?list=LL' },
    { icon: <History size={20} />, text: 'History', path: '/history' },
  ];

  const exploreLinks = [
    { icon: <Flame size={20} />, text: 'Trending', path: '/trending' },
    { icon: <Music size={20} />, text: 'Music', path: '/music' },
    { icon: <Gamepad2 size={20} />, text: 'Gaming', path: '/gaming' },
    { icon: <Trophy size={20} />, text: 'Sports', path: '/sports' },
    { icon: <Newspaper size={20} />, text: 'News', path: '/news' },
    { icon: <Clapperboard size={20} />, text: 'Movies', path: '/movies' },
  ];

  return (
    <aside className="hidden md:block w-64 bg-white h-screen overflow-y-auto fixed left-0 top-14 pb-20">
      <div className="p-4">
        <nav>
          <ul>
            {mainLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="mr-4 text-gray-700">{link.icon}</span>
                  <span className="text-sm font-medium">{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 my-3"></div>

        <nav>
          <ul>
            {secondaryLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="mr-4 text-gray-700">{link.icon}</span>
                  <span className="text-sm font-medium">{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 my-3"></div>

        <h3 className="font-medium px-3 py-2 text-lg">Explore</h3>
        <nav>
          <ul>
            {exploreLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="mr-4 text-gray-700">{link.icon}</span>
                  <span className="text-sm font-medium">{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;