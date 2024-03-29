import { css } from "@emotion/react";
import { useAutoTableTheme } from "@lib/components/ThemeProvider";

export const useAutoTableStyles = () => {
  const { theme } = useAutoTableTheme();

  const styles = css`
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: ${theme.font.fontFamily};
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    td {
      padding: 12px 15px;
    }
  `;

  return { styles };
};
