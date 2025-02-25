import React from "react";
import { Box, Typography } from "@mui/material";

function DashBoardTab() {
  return (
    <Box className="w-full h-full">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100% - 64px)",
          padding: 2,
        }}
      >
        <Typography variant="h6" component="p">
          Welcome to the Dashboard Panel
        </Typography>
      </Box>
    </Box>
  );
}

export default DashBoardTab;
