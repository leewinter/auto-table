import type { Preview } from "@storybook/react";
import React from "react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { Global, css, ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../lib/themes";

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial,
          sans-serif;
      }
    `}
  />
);

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: "light",
    Provider: ThemeProvider,
    GlobalStyles,
  }),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // decorators: decorators,
};

export default preview;
