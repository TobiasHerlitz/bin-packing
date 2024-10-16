import type { Meta, StoryObj } from '@storybook/react';
 
import { Button, ButtonSize } from './Button';
 
const meta: Meta<typeof Button> = {
  component: Button,
};
 
export default meta;
type Story = StoryObj<typeof Button>;
 
export const Primary: Story = {
  args: {
    text: 'My Button',
    size: ButtonSize.Medium,
  },
};
