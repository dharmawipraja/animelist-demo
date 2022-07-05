import * as React from "react";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import { useTimeout } from "../../hooks/useTimeout";

export const Toast = ({ message, close }) => {
  useTimeout(close, 3000)

  return (
    <Box sx={{ position: "fixed", right: 20, top: 80 }}>
      <Alert variant="filled" severity="success">
        {message}
      </Alert>
    </Box>
  );
};

export default Toast;
