import '@/__mocks__/fetchMock';
import '@/__mocks__/svgMock';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
