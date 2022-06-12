import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/auth.reducer';
import themeReducer from './theme/theme.reducer';
import headerReducer from './header/header.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    themeProvider: themeReducer,
    headerState: headerReducer,
  },
});
