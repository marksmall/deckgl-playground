import { QueryClient, QueryClientProvider } from 'react-query';

import 'tailwindcss/tailwind.css';

const queryClient = new QueryClient();

export const decorators = [
  (Story, context) => (
    <QueryClientProvider client={queryClient}>
      <Story {...context} />
    </QueryClientProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light', left: '☀️' },
        { value: 'dark', title: 'Dark', left: '🌒' },
      ],
    },
  },
};
