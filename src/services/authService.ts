// Mock user data
const mockUsers = [
  {
    userId: 'user01',
    username: 'JohnDoe',
    email: 'john@example.com',
    password: 'password123', // In a real app, this would be hashed
  },
  {
    userId: 'user02',
    username: 'JaneSmith',
    email: 'jane@example.com',
    password: 'password456',
  },
];

// Local storage keys
const TOKEN_KEY = 'youtube_clone_token';
const USER_KEY = 'youtube_clone_user';

// Helper to simulate JWT token generation
const generateToken = (userId: string) => {
  return `mock_jwt_token_${userId}_${Date.now()}`;
};

// Function to login user
export const loginUser = async (email: string, password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user with matching email and password
  const user = mockUsers.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Generate token and store in local storage
  const token = generateToken(user.userId);
  localStorage.setItem(TOKEN_KEY, token);
  
  // Store user data (except password) in local storage
  const userData = {
    userId: user.userId,
    username: user.username,
    email: user.email,
  };
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
  
  return userData;
};

// Function to register user
export const registerUser = async (username: string, email: string, password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user with same email already exists
  const userExists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (userExists) {
    throw new Error('User with this email already exists');
  }
  
  // Generate new user ID
  const userId = `user${mockUsers.length + 1}`;
  
  // Create new user
  const newUser = {
    userId,
    username,
    email,
    password,
  };
  
  // Add to mock users (in a real app, this would be saved to database)
  mockUsers.push(newUser);
  
  // Generate token and store in local storage
  const token = generateToken(userId);
  localStorage.setItem(TOKEN_KEY, token);
  
  // Store user data (except password) in local storage
  const userData = {
    userId,
    username,
    email,
  };
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
  
  return userData;
};

// Function to logout user
export const logoutUser = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Remove token and user data from local storage
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Function to get current user (from local storage)
export const getCurrentUser = async () => {
  // Check if token exists
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return null;
  }
  
  // Get user data from local storage
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) {
    return null;
  }
  
  return JSON.parse(userJson);
};