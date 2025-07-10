import { vi } from 'vitest';
import React from 'react';

vi.mock('@/assets/icons/chevron-up.svg?react', () => ({
  default: ({ className }: { className?: string }) =>
    React.createElement(
      'svg',
      {
        'data-testid': 'chevron-up-icon',
        className,
      },
      React.createElement('path', { d: 'M12.25 10.25L8 5.75L3.75 10.25' })
    ),
}));

vi.mock('@/assets/icons/chevron-down.svg?react', () => ({
  default: ({ className }: { className?: string }) =>
    React.createElement(
      'svg',
      {
        'data-testid': 'chevron-down-icon',
        className,
      },
      React.createElement('path', { d: 'M3.75 5.75L8 10.25L12.25 5.75' })
    ),
}));

vi.mock('@/assets/icons/search.svg?react', () => ({
  default: ({ className }: { className?: string }) =>
    React.createElement(
      'svg',
      {
        'data-testid': 'search-icon',
        className,
      },
      React.createElement('path', { d: 'search-icon-path' })
    ),
}));
