import { ThemeProvider } from "@emotion/react";
import { PropsWithChildren } from "react";
import { AutoTableTheme } from "@lib/themes";

type Props = {
  theme: AutoTableTheme;
};

const AutoTableThemeProvider = (props: PropsWithChildren<Props>) => {
  const { theme, children } = props;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AutoTableThemeProvider;
