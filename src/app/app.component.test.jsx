import React from 'react';

import { render, screen } from '~/test/utils';

import App from './app.component';

describe('App', () => {
  it('should render the whole app', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /main content/i }),
    ).toBeInTheDocument();
  });
});
