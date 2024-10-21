import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ButtonColor, ButtonSize } from './Button.types';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  argTypes: {
    size: {
      options: Object.values(ButtonSize).filter(
        (enumCase) => typeof enumCase === 'string'
      ),
    },
    colorScheme: {
      options: Object.values(ButtonColor).filter(
        (enumCase) => typeof enumCase === 'string'
      ),
    },
  },
  args: {
    text: 'MY BUTTON',
    size: ButtonSize.Medium,
    colorScheme: ButtonColor.Primary,
    disabled: false,
  },
};
