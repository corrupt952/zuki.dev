import React from "react";
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Config } from "@/config";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Content } from "./Content";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Config.theme}>
        <CssBaseline />
        <Header />
        <Content>
          {children}
        </Content>
        <Footer />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
