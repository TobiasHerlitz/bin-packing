// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import '@style/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
