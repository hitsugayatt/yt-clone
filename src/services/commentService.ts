// Mock comments data
let mockComments = [
  {
    commentId: 'comment01',
    videoId: 'video01',
    userId: 'user02',
    username: 'JaneSmith',
    text: 'Great video! Very helpful.',
    timestamp: '2024-09-21T08:30:00Z',
  },
  {
    commentId: 'comment02',
    videoId: 'video01',
    userId: 'user01',
    username: 'JohnDoe',
    text: 'Thanks for sharing this knowledge!',
    timestamp: '2024-09-21T09:15:00Z',
  },
  {
    commentId: 'comment03',
    videoId: 'video02',
    userId: 'user01',
    username: 'JohnDoe',
    text: 'Looking forward to more MERN stack tutorials!',
    timestamp: '2024-09-19T14:20:00Z',
  },
];

// Function to fetch comments for a video
export const fetchComments = async (videoId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Filter comments for the specified video and sort by newest first
  return mockComments
    .filter(comment => comment.videoId === videoId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Function to add a comment
export const addComment = async (videoId: string, text: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get current user from local storage
  const userJson = localStorage.getItem('youtube_clone_user');
  if (!userJson) {
    throw new Error('User not authenticated');
  }
  
  const user = JSON.parse(userJson);
  
  // Generate a new comment ID
  const commentId = `comment${mockComments.length + 1}`;
  
  // Create the new comment
  const newComment = {
    commentId,
    videoId,
    userId: user.userId,
    username: user.username,
    text,
    timestamp: new Date().toISOString(),
  };
  
  // Add to mock comments (in a real app, this would save to database)
  mockComments.push(newComment);
  
  return newComment;
};

// Function to update a comment
export const updateComment = async (commentId: string, text: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find the comment to update
  const commentIndex = mockComments.findIndex(c => c.commentId === commentId);
  
  if (commentIndex === -1) {
    throw new Error('Comment not found');
  }
  
  // Get current user from local storage
  const userJson = localStorage.getItem('youtube_clone_user');
  if (!userJson) {
    throw new Error('User not authenticated');
  }
  
  const user = JSON.parse(userJson);
  
  // Check if user is the comment author
  if (mockComments[commentIndex].userId !== user.userId) {
    throw new Error('Not authorized to update this comment');
  }
  
  // Update the comment
  mockComments[commentIndex] = {
    ...mockComments[commentIndex],
    text,
    // Optionally update timestamp to show it was edited
    // timestamp: new Date().toISOString(),
  };
  
  return mockComments[commentIndex];
};

// Function to delete a comment
export const deleteComment = async (commentId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find the comment to delete
  const commentIndex = mockComments.findIndex(c => c.commentId === commentId);
  
  if (commentIndex === -1) {
    throw new Error('Comment not found');
  }
  
  // Get current user from local storage
  const userJson = localStorage.getItem('youtube_clone_user');
  if (!userJson) {
    throw new Error('User not authenticated');
  }
  
  const user = JSON.parse(userJson);
  
  // Check if user is the comment author
  if (mockComments[commentIndex].userId !== user.userId) {
    throw new Error('Not authorized to delete this comment');
  }
  
  // Remove the comment
  mockComments = mockComments.filter(c => c.commentId !== commentId);
  
  return { success: true };
};