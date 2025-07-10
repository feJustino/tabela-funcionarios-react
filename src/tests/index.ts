import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'>;

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  return render(ui, options);
};

export * from '@testing-library/react';

export { customRender as render };
