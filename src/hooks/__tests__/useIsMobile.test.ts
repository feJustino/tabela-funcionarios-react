import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useIsMobile from '../useIsMobile';

const createWindowSizeMock = () => {
  const originalInnerWidth = window.innerWidth;

  const mockInnerWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });

    window.dispatchEvent(new Event('resize'));
  };

  const restore = () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  };

  return { mockInnerWidth, restore };
};

describe('useIsMobile', () => {
  let windowMock: ReturnType<typeof createWindowSizeMock>;

  beforeEach(() => {
    windowMock = createWindowSizeMock();
    windowMock.mockInnerWidth(1024);
    vi.clearAllMocks();
  });

  afterEach(() => {
    windowMock.restore();
  });

  it('deve detectar dispositivos móveis corretamente com breakpoint padrão (768px)', () => {
    windowMock.mockInnerWidth(600);
    const { result: mobileResult } = renderHook(() => useIsMobile());
    expect(mobileResult.current).toBe(true);

    windowMock.mockInnerWidth(800);
    const { result: desktopResult } = renderHook(() => useIsMobile());
    expect(desktopResult.current).toBe(false);

    windowMock.mockInnerWidth(768);
    const { result: exactResult } = renderHook(() => useIsMobile());
    expect(exactResult.current).toBe(false);
  });

  it('deve gerenciar event listeners de resize corretamente', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    windowMock.mockInnerWidth(800);

    const { unmount } = renderHook(() => useIsMobile());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
