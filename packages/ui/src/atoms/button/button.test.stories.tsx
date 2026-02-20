import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  expect,
  fireEvent,
  fn,
  userEvent,
  waitFor,
  within,
} from "storybook/test";

import { Button } from "./button";

const meta = {
  title: "Atoms/Button/Tests",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClickFiresOnClick: Story = {
  tags: ["!autodocs"],
  args: { children: "Click me", onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const KeyboardEnterActivates: Story = {
  tags: ["!autodocs"],
  args: { children: "Press Enter", onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    button.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const KeyboardSpaceActivates: Story = {
  tags: ["!autodocs"],
  args: { children: "Press Space", onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    button.focus();
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const TabFocusesButton: Story = {
  tags: ["!autodocs"],
  args: { children: "Tab to me" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const DisabledIgnoresClick: Story = {
  tags: ["!autodocs"],
  args: { children: "Disabled", disabled: true, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeDisabled();
    fireEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const PrimaryVariantClasses: Story = {
  tags: ["!autodocs"],
  args: { variant: "primary", children: "Primary" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.className).toContain("bg-blue-600");
    await expect(button.className).toContain("text-white");
  },
};

export const SecondaryVariantClasses: Story = {
  tags: ["!autodocs"],
  args: { variant: "secondary", children: "Secondary" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.className).toContain("bg-gray-500");
    await expect(button.className).toContain("text-white");
  },
};

export const OutlineVariantClasses: Story = {
  tags: ["!autodocs"],
  args: { variant: "outline", children: "Outline" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.className).toContain("bg-transparent");
    await expect(button.className).toContain("border-2");
    await expect(button.className).toContain("text-blue-600");
  },
};

export const SmallSizeClasses: Story = {
  tags: ["!autodocs"],
  args: { size: "sm", children: "Small" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.className).toContain("px-3");
    await expect(button.className).toContain("py-1");
    await expect(button.className).toContain("text-sm");
  },
};

export const MediumSizeClasses: Story = {
  tags: ["!autodocs"],
  args: { size: "md", children: "Medium" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.className).toContain("px-4");
    await expect(button.className).toContain("py-2");
    await expect(button.className).toContain("text-base");
  },
};

export const LargeSizeClasses: Story = {
  tags: ["!autodocs"],
  args: { size: "lg", children: "Large" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.className).toContain("px-6");
    await expect(button.className).toContain("py-3");
    await expect(button.className).toContain("text-lg");
  },
};

export const DisabledVisualClasses: Story = {
  tags: ["!autodocs"],
  args: { disabled: true, children: "Disabled" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.className).toContain("disabled:opacity-50");
    await expect(button.className).toContain("disabled:cursor-not-allowed");
  },
};

export const DefaultPropsRender: Story = {
  tags: ["!autodocs"],
  args: { children: "Default" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.className).toContain("bg-blue-600");
    await expect(button.className).toContain("px-4");
    await expect(button).toHaveAttribute("type", "button");
  },
};

export const TypeSubmitOverride: Story = {
  tags: ["!autodocs"],
  args: { children: "Submit", type: "submit" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toHaveAttribute("type", "submit");
  },
};

export const CustomClassNamePassthrough: Story = {
  tags: ["!autodocs"],
  args: { children: "Custom", className: "my-custom-class" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button.className).toContain("my-custom-class");
    await expect(button.className).toContain("rounded-md");
  },
};

function ToggleVariantWrapper() {
  const [active, setActive] = useState(false);
  return (
    <Button
      variant={active ? "primary" : "outline"}
      onClick={() => setActive(!active)}
    >
      {active ? "Active" : "Inactive"}
    </Button>
  );
}

export const ToggleVariantOnClick: Story = {
  tags: ["!autodocs"],
  render: () => <ToggleVariantWrapper />,
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toHaveTextContent("Inactive");
    await expect(button.className).toContain("bg-transparent");
    await userEvent.click(button);
    await waitFor(() => {
      expect(button).toHaveTextContent("Active");
      expect(button.className).toContain("bg-blue-600");
    });
  },
};

function ClickCounterWrapper() {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount((c) => c + 1)}>
      Clicked {count} times
    </Button>
  );
}

export const ClickCounterIntegration: Story = {
  tags: ["!autodocs"],
  render: () => <ClickCounterWrapper />,
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toHaveTextContent("Clicked 0 times");
    await userEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent("Clicked 1 times"));
    await userEvent.click(button);
    await userEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent("Clicked 3 times"));
  },
};
