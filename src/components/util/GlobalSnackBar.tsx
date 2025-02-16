import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { hideSnackbar } from "../../redux/globalAlertSlice";

const GlobalSnackbar: React.FC = () => {
    const dispatch = useDispatch();
    const { message, severity, open } = useSelector((state: RootState) => state.globalAlert);
  
    return (
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => dispatch(hideSnackbar())}
      >
        <Alert onClose={() => dispatch(hideSnackbar())} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    );
  };
  
  export default GlobalSnackbar;
