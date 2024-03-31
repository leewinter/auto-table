import type { Meta, StoryObj } from "@storybook/react";
import { TableBody } from "@lib/components/AutoTable/TableBody/TableBody";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/AutoTable/TableBody",
  component: TableBody,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <table>
        <Story />
      </table>
    ),
  ],
} satisfies Meta<typeof TableBody>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DataArray: Story = {
  args: {
    isNonKeyValueArray: false,
    visibleRows: [
      {
        id: 1,
        name: "Lee",
        mobile: "na",
        isAwesome: true,
      },
      {
        id: 2,
        name: "Danny",
        mobile: "123456789",
        isAwesome: false,
      },
      {
        id: 3,
        name: "Tom",
        mobile: "987654321",
        isAwesome: true,
      },
      {
        id: 4,
        name: "Jerry",
        mobile: "987654321",
        isAwesome: true,
      },
      {
        id: 5,
        name: "Terry",
        mobile: "987654321",
        isAwesome: true,
      },
      {
        id: 6,
        name: "Jeff",
        mobile: "987654321",
        isAwesome: true,
      },
      {
        id: 7,
        name: "Tony",
        mobile: "987654321",
        isAwesome: true,
      },
      {
        id: 8,
        name: "Paul",
        mobile: "987654321",
        isAwesome: true,
      },
      {
        id: 9,
        name: "Becky",
        mobile: "987654321",
        isAwesome: true,
      },
      {
        id: 10,
        name: "Sarah",
        mobile: "987654321",
        isAwesome: true,
      },
      {
        id: 11,
        name: "Katy",
        mobile: "987654321",
        isAwesome: true,
      },
    ],
    tableIndex: 1,
    onRowClicked: () => {},
    selectedRow: "",
    columns: ["id", "name", "mobile", "isAwesome"],
    options: {
      pagination: { usePagination: true, itemsPerPage: 5 },
      showSearch: false,
    },
  },
};
