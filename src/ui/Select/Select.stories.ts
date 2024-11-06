import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  argTypes: {},
  args: {
    options: [
      { label: 'Select something', value: '' },
      { label: 'Option one', value: 1 },
      { label: 'Option two', value: 2 },
      { label: 'Option three', value: 3 },
      { label: 'Option four', value: 4 },
    ],
  },
};
