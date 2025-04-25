import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  fetchComments, 
  addComment, 
  updateComment, 
  deleteComment 
} from '../services/commentService';

interface Comment {
  commentId: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

const CommentSection = ({ videoId }: { videoId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchComments(videoId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    
    loadComments();
  }, [videoId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please sign in to comment');
      return;
    }
    
    if (!commentText.trim()) return;
    
    try {
      const newComment = await addComment(videoId, commentText);
      setComments([newComment, ...comments]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  const handleEditComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingCommentId || !editText.trim()) return;
    
    try {
      const updatedComment = await updateComment(editingCommentId, editText);
      setComments(comments.map(comment => 
        comment.commentId === editingCommentId ? updatedComment : comment
      ));
      setEditingCommentId(null);
      setEditText('');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.commentId !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    }
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }
    
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <MessageSquare size={20} className="mr-2" />
        <h3 className="font-medium">{comments.length} Comments</h3>
      </div>
      
      {user && (
        <form onSubmit={handleAddComment} className="flex mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
            <div className="w-full h-full flex items-center justify-center text-white font-medium">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="flex-1 ml-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button
                type="button"
                onClick={() => setCommentText('')}
                className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!commentText.trim()}
                className={`px-3 py-1.5 rounded-full ${
                  commentText.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      )}
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.commentId} className="flex">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center text-white font-medium">
                {comment.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="ml-3 flex-1">
              {editingCommentId === comment.commentId ? (
                <form onSubmit={handleEditComment}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                    autoFocus
                  />
                  <div className="flex justify-end mt-2 space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCommentId(null);
                        setEditText('');
                      }}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!editText.trim()}
                      className={`px-3 py-1.5 rounded-full ${
                        editText.trim()
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{comment.username}</span>
                    <span className="text-sm text-gray-500">{formatDate(comment.timestamp)}</span>
                  </div>
                  <p className="mt-1">{comment.text}</p>
                  {user && user.userId === comment.userId && (
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => {
                          setEditingCommentId(comment.commentId);
                          setEditText(comment.text);
                        }}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.commentId)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;