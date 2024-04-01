import type { Meta, StoryObj } from "@storybook/react";
import { AutoTable } from "@lib/components/AutoTable/AutoTable";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "AutoTable",
  component: AutoTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AutoTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DataArray: Story = {
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
        id: 3,
        name: "Tom",
        mobile: "987654321",
        isAwesome: true,
        primitiveArray: [],
      },
      {
        id: 4,
        name: "Jerry",
        mobile: "987654321",
        isAwesome: true,
        primitiveArray: [],
      },
      {
        id: 5,
        name: "Terry",
        mobile: "987654321",
        isAwesome: true,
        primitiveArray: [],
      },
      {
        id: 6,
        name: "Jeff",
        mobile: "987654321",
        isAwesome: true,
        primitiveArray: [],
      },
      {
        id: 7,
        name: "Tony",
        mobile: "987654321",
        isAwesome: true,
        primitiveArray: [],
      },
      {
        id: 8,
        name: "Paul",
        mobile: "987654321",
        isAwesome: true,
        primitiveArray: [],
      },
      {
        id: 9,
        name: "Becky",
        mobile: "987654321",
        isAwesome: true,
        primitiveArray: [],
      },
      {
        id: 10,
        name: "Sarah",
        mobile: "987654321",
        isAwesome: true,
        primitiveArray: [],
      },
      {
        id: 11,
        name: "Katy",
        mobile: "987654321",
        isAwesome: true,
        primitiveArray: [],
      },
    ],
    options: {
      pagination: { usePagination: true, itemsPerPage: 5 },
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

export const SortableEmbeddedArray: Story = {
  args: {
    data: [
      {
        id: 1,
        name: "Lee",
        mobile: "na",
        isAwesome: true,
        embeddedArray: [
          { col1: 1, col2: "a", col3: true, col4: 123 },
          { col1: 2, col2: "b", col3: false, col4: 234 },
          { col1: 3, col2: "c", col3: true, col4: 345 },
          { col1: 4, col2: "d", col3: true, col4: 456 },
        ],
      },
      {
        id: 2,
        name: "Danny",
        mobile: "123456789",
        isAwesome: false,
        embeddedArray: [
          { col1: 1, col2: "a", col3: true, col4: 123 },
          { col1: 2, col2: "b", col3: false, col4: 234 },
          { col1: 3, col2: "c", col3: true, col4: 345 },
          { col1: 4, col2: "d", col3: true, col4: 456 },
        ],
      },
      {
        id: 3,
        name: "Tom",
        mobile: "987654321",
        isAwesome: true,
        embeddedArray: [],
      },
      {
        id: 4,
        name: "Jerry",
        mobile: "987654321",
        isAwesome: true,
        embeddedArray: [],
      },
      {
        id: 5,
        name: "Terry",
        mobile: "987654321",
        isAwesome: true,
        embeddedArray: [],
      },
      {
        id: 6,
        name: "Jeff",
        mobile: "987654321",
        isAwesome: true,
        embeddedArray: [],
      },
      {
        id: 7,
        name: "Tony",
        mobile: "987654321",
        isAwesome: true,
        embeddedArray: [],
      },
      {
        id: 8,
        name: "Paul",
        mobile: "987654321",
        isAwesome: true,
        embeddedArray: [],
      },
      {
        id: 9,
        name: "Becky",
        mobile: "987654321",
        isAwesome: true,
        embeddedArray: [],
      },
      {
        id: 10,
        name: "Sarah",
        mobile: "987654321",
        isAwesome: true,
        embeddedArray: [],
      },
      {
        id: 11,
        name: "Katy",
        mobile: "987654321",
        isAwesome: true,
        embeddedArray: [],
      },
    ],
    options: {
      pagination: { usePagination: true, itemsPerPage: 5 },
      showSearch: true,
    },
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
