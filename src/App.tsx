import { CircularProgress } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import colors from "./resources/colors";
import route from "./route";

function App() {
  const router = createBrowserRouter(route);
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
    },
    typography: {
      fontFamily: "dancing script, cursive",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
