import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter/counterSlice';
import themeReducer from './theme/theme.reducer';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    counter: counterReducer,
  },
});
