import AutoTable from "./AutoTable";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "AutoTable",
  component: AutoTable,
  tags: ["autodocs"],
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Array = {
  args: {
    data: [
      { id: 1, name: "Lee", mobile: "na" },
      { id: 2, name: "Danny", mobile: "123456789" },
      { id: 2, name: "Tom", mobile: "987654321" },
    ],
  },
};

export const Object = {
  args: {
    data: { id: 1, name: "Steve" },
  },
};

export const NoStyle = {
  args: {
    data: { id: 1, name: "Steve" },
    tableClass: null,
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
