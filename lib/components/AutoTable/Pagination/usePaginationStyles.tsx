import { css } from "@emotion/react";
import { useAutoTableTheme } from "@lib/components/ThemeProvider";

export const usePaginationStyles = () => {
  const { theme } = useAutoTableTheme();

  const styles = css`
    ul {
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      list-style-type: none;
      padding: 0 5rem;
    }

    ul li a {
      border-radius: 7px;
      padding: 0.1rem 1rem;
      border: ${theme.colors.borderColorStandard} 1px solid;
      cursor: pointer;
    }

    ul li.previous a,
    ul li.next a,
    ul li.break a {
      border-color: transparent;
    }

    ul li.selected a {
      background-color: ${theme.colors.bgColorActive};
      border-color: transparent;
      color: ${theme.colors.txtColorActive};
      min-width: 32px;
    }

    ul li.disabled a {
      color: ${theme.colors.txtColorDisabled};
    }

    ul li.disable,
    ul li.disabled a {
      cursor: default;
    }
  `;

  return { styles };
};
