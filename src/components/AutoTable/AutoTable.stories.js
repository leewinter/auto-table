import AutoTable from "./AutoTable";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "AutoTable",
  component: AutoTable,
  tags: ["autodocs"],
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DataArray = {
  args: {
    data: [
      {
        id: 1,
        name: "Lee",
        mobile: "na",
        isAwesome: true,
        primitiveArray: ["string 1", "string 2", "string 3"],
      },
      {
        id: 2,
        name: "Danny",
        mobile: "123456789",
        isAwesome: false,
        primitiveArray: [],
      },
      {
        id: 2,
        name: "Tom",
        mobile: "987654321",
        isAwesome: true,
        primitiveArray: [],
      },
    ],
    tableClass: "styled-table",
    options: {
      pagination: { usePagination: false, itemsPerPage: 10 },
      showSearch: true,
    },
  },
};

export const HumanReadableHeadersOff = {
  args: {
    data: [{ id: 1, name: "Lee", mobile: "na", isAwesome: true }],
    options: { humanReadableHeaders: false },
  },
};

export const Object = {
  args: {
    data: { id: 1, name: "Steve" },
  },
};

export const Pagination = {
  args: {
    data: Array.from({ length: 40 }, () => Math.floor(Math.random() * 40)).map(
      (n) => {
        return { randomInt: n, unitsOfAlcoholPerWeek: n * 5 };
      }
    ),
    options: {
      pagination: { usePagination: true, itemsPerPage: 5 },
      showSearch: true,
    },
  },
};

export const NoStyle = {
  args: {
    data: { id: 1, name: "Steve" },
    tableClass: null,
    options: { pagination: { usePagination: false } },
  },
};

export const Empty = {
  args: {
    data: null,
  },
};

export const Undefined = {
  args: {
    data: undefined,
  },
};
