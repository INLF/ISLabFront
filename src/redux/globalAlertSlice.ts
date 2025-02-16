import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  message: string | null;
  severity: "success" | "error" | "warning" | "info";
  open: boolean;
}

const initialState: SnackbarState = {
  message: null,
  severity: "info",
  open: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; severity: "success" | "error" | "warning" | "info" }>
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = null;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
