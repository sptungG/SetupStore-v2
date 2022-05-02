import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/user.reducer";
import modeReducer from "./mode/mode.reducer";

export default configureStore({
  reducer: {
    mode: modeReducer,
    user: userReducer,
  },
});
