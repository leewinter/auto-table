import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TableSearch } from "@lib/components/AutoTable/TableSearch/TableSearch";

const meta = {
  title: "Components/AutoTable/TableSearch",
  component: TableSearch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TableSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSearchChange: fn(),
  },
};
