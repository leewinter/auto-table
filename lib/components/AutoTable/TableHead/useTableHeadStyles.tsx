import { css } from "@emotion/react";
import { useAutoTableTheme } from "@lib/components/ThemeProvider";

export const useTableHeadStyles = () => {
  const { theme } = useAutoTableTheme();

  const styles = css`
    tr {
      background-color: ${theme.colors.bgColorHead};
      color: ${theme.colors.txtColorHead};
      text-align: left;
    }

    th,
    td {
      padding: 12px 15px;
    }
  `;

  return { styles };
};
