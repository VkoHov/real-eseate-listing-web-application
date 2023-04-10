import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import postsSlice from './posts/posts.slice';

const rootReducer = combineReducers({ authReducer, postsSlice });

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
