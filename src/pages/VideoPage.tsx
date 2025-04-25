import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Flag, MessageSquare } from 'lucide-react';
import { fetchVideoById } from '../services/videoService';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';

const VideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        if (videoId) {
          const videoData = await fetchVideoById(videoId);
          setVideo(videoData);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadVideo();
  }, [videoId]);

  const handleLike = () => {
    if (!user) {
      alert('Please sign in to like videos');
      return;
    }
    
    setLiked(!liked);
    if (disliked) setDisliked(false);
    // In a real app, this would call an API to update like status
  };

  const handleDislike = () => {
    if (!user) {
      alert('Please sign in to dislike videos');
      return;
    }
    
    setDisliked(!disliked);
    if (liked) setLiked(false);
    // In a real app, this would call an API to update dislike status
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    } else {
      return views?.toString() || '0';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium">Video not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="lg:flex lg:space-x-6">
        <div className="lg:w-3/4">
          {/* Video Player */}
          <div className="bg-black aspect-video w-full flex items-center justify-center rounded-lg mb-4">
            <div className="text-white text-lg">Video Player Placeholder</div>
          </div>
          
          {/* Video Info */}
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-2">{video.title}</h1>
            
            <div className="flex flex-wrap items-center justify-between py-2 border-b border-gray-200">
              <div className="text-gray-600 mb-2 md:mb-0">
                <span>{formatViews(video.views)} views</span>
                <span className="mx-1">•</span>
                <span>{formatDate(video.uploadDate)}</span>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleLike} 
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-gray-100 ${liked ? 'font-medium text-blue-600' : ''}`}
                >
                  <ThumbsUp size={18} />
                  <span>{video.likes}</span>
                </button>
                
                <button 
                  onClick={handleDislike} 
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-gray-100 ${disliked ? 'font-medium text-blue-600' : ''}`}
                >
                  <ThumbsDown size={18} />
                </button>
                
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-gray-100">
                  <Share size={18} />
                  <span className="hidden sm:inline">Share</span>
                </button>
                
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-gray-100">
                  <Flag size={18} />
                  <span className="hidden sm:inline">Report</span>
                </button>
              </div>
            </div>
            
            {/* Channel info and description */}
            <div className="flex items-start mt-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div className="ml-3 flex-1">
                <h3 className="font-medium text-lg">{video.channelName}</h3>
                <p className="text-gray-600 text-sm">12.4K subscribers</p>
                
                <div className="mt-4">
                  <p className="text-gray-800 whitespace-pre-line">{video.description}</p>
                </div>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
          
          {/* Comments */}
          <CommentSection videoId={videoId} />
        </div>
        
        {/* Recommended videos */}
        <div className="lg:w-1/4 mt-6 lg:mt-0">
          <h3 className="font-medium mb-4">Recommended videos</h3>
          {/* This would be populated with recommended videos from an API */}
          <div className="space-y-4">
            {Array(5).fill(null).map((_, index) => (
              <div key={index} className="flex space-x-2">
                <div className="w-40 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-sm line-clamp-2">Recommended Video {index + 1}</h4>
                  <p className="text-xs text-gray-600 mt-1">Channel Name</p>
                  <p className="text-xs text-gray-600">10K views • 3 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;