import { Theme } from "@emotion/react";

export interface AutoTableTheme extends Theme {
  colors: {
    txtColorActive: string;
    bgColorActive: string;
    borderColorStandard: string;
    borderColorTr: string;
    txtColorDisabled: string;
    bgColorHead: string;
    bgColorEvenRow: string;
    txtColorEvenRow: string;
    txtColorHead: string;
    borderColorBotTr: string;
  };
  font: {
    fontFamily: string;
  };
}

export const darkTheme = {
  colors: {
    // Active
    txtColorActive: "#000",
    bgColorActive: "#376687",
    // Default
    borderColorStandard: "grey",
    borderColorBotTr: "#376687",
    borderColorTr: "#dddddd",
    bgColorHead: "#376687",
    bgColorEvenRow: "#f3f3f3",
    txtColorEvenRow: "#000",
    txtColorHead: "#ffffff",
    // Disabled
    txtColorDisabled: "grey",
  },
  font: {
    fontFamily: "sans-serif",
  },
};
export const lightTheme = {
  colors: {
    // Active
    txtColorActive: "#0B0A07",
    bgColorActive: "#C5FFFD",
    // Default
    borderColorStandard: "grey",
    borderColorBotTr: "#376687",
    borderColorTr: "#dddddd",
    bgColorHead: "#C5FFFD",
    bgColorEvenRow: "#C5FFFD",
    txtColorEvenRow: "#000",
    txtColorHead: "#F06543",
    // Disabled
    txtColorDisabled: "grey",
  },
  font: {
    fontFamily: "sans-serif",
  },
};
