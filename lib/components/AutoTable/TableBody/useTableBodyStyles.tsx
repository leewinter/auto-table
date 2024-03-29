import { css } from "@emotion/react";
import { useAutoTableTheme } from "@lib/components/ThemeProvider";

export const useTableBodyStyles = () => {
  const { theme } = useAutoTableTheme();

  const styles = css`
    tr {
      border-bottom: 1px solid ${theme.colors.borderColorTr};
    }

    tr:nth-of-type(even) {
      background-color: ${theme.colors.bgColorEvenRow};
      color: ${theme.colors.txtColorEvenRow};
    }

    tr:last-of-type {
      border-bottom: 2px solid ${theme.colors.borderColorBotTr};
    }

    tr.active-row {
      font-weight: bold;
      color: ${theme.colors.txtColorActive};
    }
  `;

  return { styles };
};
