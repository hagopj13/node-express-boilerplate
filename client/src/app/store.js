import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../features/token/tokenSlice';
import userReducer from '../features/user/userSlice';
import resourceReducer from '../features/resource/resourceSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    resource: resourceReducer,
  },
});