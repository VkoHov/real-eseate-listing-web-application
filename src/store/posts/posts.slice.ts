import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'config/axios';
import { RootState } from 'store';
import { Post } from 'components/PostModal';

// Define the type for post data

// Define the initial state for posts
interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state for posts
const initialState: PostsState = {
  posts: [],
  currentPost: null,
  status: 'idle',
  error: null,
};

// Fetch posts async thunk
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (queryParams: string) => {
    try {
      const response = await axios.get('/posts' + queryParams); // Change the URL to your JSON server endpoint for posts
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  },
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (postId: string | number) => {
    try {
      const response = await axios.get('/posts/' + postId); // Change the URL to your JSON server endpoint for posts
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  },
);

// Create post async thunk
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post: Post) => {
    try {
      const response = await axios.post('/posts', post); // Change the URL to your JSON server endpoint for creating posts
      return response.data;
    } catch (error) {
      throw new Error('Failed to create post');
    }
  },
);

// Update post async thunk
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post: Post) => {
    try {
      const response = await axios.patch(`/posts/${post.id}`, post); // Change the URL to your JSON server endpoint for updating posts
      return response.data;
    } catch (error) {
      throw new Error('Failed to update post');
    }
  },
);

// Delete post async thunk
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId: number | string) => {
    try {
      await axios.delete(`/posts/${postId}`); // Change the URL to your JSON server endpoint for deleting posts
      return postId;
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  },
);

// Define the posts slice
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch posts';
      })
      .addCase(fetchPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch posts';
      })
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to create post';
      })
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedPost = action.payload;
        const existingPostIndex = state.posts.findIndex(
          (post) => post.id === updatedPost.id,
        );
        if (state.currentPost?.id === updatedPost.id) {
          state.currentPost = updatedPost;
        }
        if (existingPostIndex !== -1) {
          state.posts[existingPostIndex] = updatedPost;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to update post';
      })
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const deletedPostId = action.payload;
        state.posts = state.posts.filter((post) => post.id !== deletedPostId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to delete post';
      });
  },
});

// Export the actions and reducer
export default postsSlice.reducer;

// Define selector functions for accessing posts state
export const selectPosts = (state: RootState) => state.postsSlice.posts;
export const selectPost = (state: RootState) => state.postsSlice.currentPost;
export const selectStatus = (state: RootState) => state.postsSlice.status;
export const selectError = (state: RootState) => state.postsSlice.error;
