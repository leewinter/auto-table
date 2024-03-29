import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TableFoot } from "@lib/components/AutoTable/TableFoot/TableFoot";

const meta = {
  title: "Components/AutoTable/TableFoot",
  component: TableFoot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [
    (Story) => (
      <table>
        <Story />
      </table>
    ),
  ],
} satisfies Meta<typeof TableFoot>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    columns: ["col 1", "col 2"],
    onPageChange: fn(),
    pageCount: 2,
    usePagination: true,
  },
};
