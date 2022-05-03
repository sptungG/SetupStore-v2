import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/auth.reducer';
import counterReducer from './counter/counterSlice';
import themeReducer from './theme/theme.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    counter: counterReducer,
  },
});
