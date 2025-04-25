import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import FilterBar from '../components/FilterBar';
import { fetchVideos } from '../services/videoService';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    
    const loadVideos = async () => {
      try {
        setLoading(true);
        const fetchedVideos = await fetchVideos(searchQuery, activeFilter);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadVideos();
  }, [location.search, activeFilter]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="pt-2">
      <FilterBar onFilterChange={handleFilterChange} />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium">No videos found</h2>
          <p className="text-gray-600 mt-2">Try a different search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;