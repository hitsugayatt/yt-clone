import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  video: {
    videoId: string;
    title: string;
    thumbnail: string;
    channelName: string;
    views: number;
    uploadDate: string;
  };
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const uploadDate = new Date(video.uploadDate);
      const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        setTimeAgo('1 day ago');
      } else if (diffDays < 7) {
        setTimeAgo(`${diffDays} days ago`);
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        setTimeAgo(`${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`);
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        setTimeAgo(`${months} ${months === 1 ? 'month' : 'months'} ago`);
      } else {
        const years = Math.floor(diffDays / 365);
        setTimeAgo(`${years} ${years === 1 ? 'year' : 'years'} ago`);
      }
    };

    calculateTimeAgo();
  }, [video.uploadDate]);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    } else {
      return views.toString();
    }
  };

  return (
    <Link to={`/video/${video.videoId}`} className="group">
      <div className="rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full aspect-video object-cover" 
        />
      </div>
      <div className="mt-3 flex">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
          {/* This would be the channel avatar */}
        </div>
        <div className="ml-3">
          <h3 className="text-base font-medium line-clamp-2 leading-tight group-hover:text-blue-600">
            {video.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{video.channelName}</p>
          <div className="text-sm text-gray-600">
            <span>{formatViews(video.views)} views</span>
            <span className="mx-1">•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;