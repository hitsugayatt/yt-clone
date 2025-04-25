// Mock data for videos
const mockVideos = [
  {
    videoId: 'video01',
    title: 'Learn React in 30 Minutes',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    channelName: 'React Mastery',
    views: 15200,
    uploadDate: '2024-09-20',
    description: 'A quick tutorial to get started with React. We cover components, props, state, and more!',
    likes: 1023,
    dislikes: 45,
    comments: [
      {
        commentId: 'comment01',
        userId: 'user02',
        username: 'ReactFan',
        text: 'Great video! Very helpful.',
        timestamp: '2024-09-21T08:30:00Z',
      },
    ],
  },
  {
    videoId: 'video02',
    title: 'Build a Full Stack App with MERN',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    channelName: 'Web Dev Simplified',
    views: 32500,
    uploadDate: '2024-09-18',
    description: 'Learn to build a complete application using MongoDB, Express, React, and Node.js.',
    likes: 2100,
    dislikes: 95,
    comments: [],
  },
  {
    videoId: 'video03',
    title: 'CSS Grid Layout Tutorial',
    thumbnail: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    channelName: 'CSS Wizardry',
    views: 8700,
    uploadDate: '2024-09-15',
    description: 'Master CSS Grid layout with this comprehensive tutorial.',
    likes: 543,
    dislikes: 12,
    comments: [],
  },
  {
    videoId: 'video04',
    title: 'JavaScript Array Methods Every Developer Should Know',
    thumbnail: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    channelName: 'JavaScript Guru',
    views: 21300,
    uploadDate: '2024-09-12',
    description: 'Learn the most useful JavaScript array methods that will make your coding life easier.',
    likes: 1256,
    dislikes: 28,
    comments: [],
  },
  {
    videoId: 'video05',
    title: 'TypeScript Crash Course',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    channelName: 'TypeScript Master',
    views: 18400,
    uploadDate: '2024-09-10',
    description: 'Get up to speed with TypeScript in this comprehensive crash course.',
    likes: 987,
    dislikes: 43,
    comments: [],
  },
  {
    videoId: 'video06',
    title: 'Redux Made Easy: State Management in React',
    thumbnail: 'https://images.pexels.com/photos/11035474/pexels-photo-11035474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    channelName: 'React Mastery',
    views: 9800,
    uploadDate: '2024-09-08',
    description: 'Learn how to implement Redux for state management in your React applications.',
    likes: 678,
    dislikes: 31,
    comments: [],
  },
  {
    videoId: 'video07',
    title: 'Build a Responsive Website with Tailwind CSS',
    thumbnail: 'https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    channelName: 'CSS Wizardry',
    views: 14200,
    uploadDate: '2024-09-05',
    description: 'Create a beautiful responsive website using Tailwind CSS framework.',
    likes: 892,
    dislikes: 19,
    comments: [],
  },
  {
    videoId: 'video08',
    title: 'Node.js Authentication with JWT',
    thumbnail: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    channelName: 'Backend Master',
    views: 11700,
    uploadDate: '2024-09-03',
    description: 'Implement authentication in your Node.js applications using JSON Web Tokens.',
    likes: 765,
    dislikes: 24,
    comments: [],
  },
];

// Function to fetch videos (would connect to API in real app)
export const fetchVideos = async (searchQuery?: string | null, filter?: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter by search query if provided
  let filteredVideos = [...mockVideos];
  
  if (searchQuery) {
    filteredVideos = filteredVideos.filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Filter by category if not "All"
  if (filter && filter !== 'All') {
    // This is a simple mock implementation
    // In a real app, videos would have category tags
    const filterMap: Record<string, string[]> = {
      'Music': ['music', 'song', 'audio'],
      'Gaming': ['game', 'gaming'],
      'Computer Science': ['javascript', 'react', 'css', 'typescript', 'node.js'],
    };
    
    const keywords = filterMap[filter] || [];
    if (keywords.length > 0) {
      filteredVideos = filteredVideos.filter(video => 
        keywords.some(keyword => 
          video.title.toLowerCase().includes(keyword) || 
          video.description.toLowerCase().includes(keyword)
        )
      );
    }
  }
  
  return filteredVideos;
};

// Function to fetch a single video by ID
export const fetchVideoById = async (videoId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const video = mockVideos.find(v => v.videoId === videoId);
  
  if (!video) {
    throw new Error('Video not found');
  }
  
  return video;
};