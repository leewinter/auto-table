import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@lib/components/AutoTable/Pagination/Pagination";

const meta = {
  title: "Components/AutoTable/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    onPageChange: (selectedPage) => {
      console.log("selectedPage", selectedPage);
    },
    pageCount: 100,
    pageRangeDisplayed: 5,
  },
};
