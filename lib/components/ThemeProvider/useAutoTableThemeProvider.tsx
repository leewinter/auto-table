import { useTheme } from "@emotion/react";
import { AutoTableTheme, darkTheme } from "@lib/themes";

export const useAutoTableTheme = () => {
  const theme = (useTheme() ?? darkTheme) as AutoTableTheme;

  return { theme };
};
