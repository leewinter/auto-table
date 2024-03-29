import type { Meta, StoryObj } from "@storybook/react";
import { useAutoTableTheme } from "@lib/components/ThemeProvider";
import { DynamicKeyValue } from "@lib/types";

const ThemesDisplay = () => {
  const { theme } = useAutoTableTheme();

  const categories = Object.keys(theme);

  return (
    <div>
      {categories.map((c) => {
        const themeAsDynamicKeyValue = theme as DynamicKeyValue;
        const dynamicCatIndex: keyof DynamicKeyValue = c;
        const propKeys = Object.keys(themeAsDynamicKeyValue[dynamicCatIndex]);
        return (
          <div>
            <div>
              <strong>{c}</strong>
            </div>
            <ul style={{ listStyleType: "none" }}>
              {propKeys.map((p) => {
                const propAsDynamicKeyValue = themeAsDynamicKeyValue[
                  dynamicCatIndex
                ] as DynamicKeyValue;
                const dynamicPropIndex: keyof DynamicKeyValue = p;

                let styles = {};
                if (p.indexOf("color"))
                  styles = {
                    ...styles,
                    backgroundColor: propAsDynamicKeyValue[dynamicPropIndex],
                  };
                if (p.indexOf("fontFamily"))
                  styles = {
                    ...styles,
                    fontFamily: propAsDynamicKeyValue[dynamicPropIndex],
                  };
                return (
                  <li>
                    <span>{p}</span>
                    <div
                      style={{
                        ...styles,
                        display: "block",
                        height: "40px",
                        borderRadius: "10px 100px / 120px",
                        padding: "5px",
                      }}
                    >
                      {propAsDynamicKeyValue[dynamicPropIndex]}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

const meta = {
  title: "Themes/ThemesDisplay",
  component: ThemesDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ThemesDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
