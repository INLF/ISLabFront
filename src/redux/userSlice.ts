import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/userTypes";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetUserState: (state) => {
      return initialState; // Resets the whole state
    },
  },
});

export const { setUser, setLoading, setError, resetUserState } = userSlice.actions;
export default userSlice.reducer;
