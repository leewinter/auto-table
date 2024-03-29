import type { Meta, StoryObj } from "@storybook/react";
import { TableHead } from "@lib/components/AutoTable/TableHead/TableHead";

const meta = {
  title: "Components/AutoTable/TableHead",
  component: TableHead,
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
} satisfies Meta<typeof TableHead>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    isNonKeyValueArray: false,
    columns: ["Col 1", "Col 2", "col 3"],
    humanReadableHeaders: true,
  },
};
