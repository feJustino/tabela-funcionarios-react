import { vi } from 'vitest';
import { createMockEmployeeList } from './createMockEmployeeList';

(globalThis as typeof globalThis & { fetch: typeof fetch }).fetch = vi.fn();

export const mockFetchResponse = (data: unknown, status = 200) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    blob: () => Promise.resolve(new Blob([JSON.stringify(data)])),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    formData: () => Promise.resolve(new FormData()),
    bytes: () => Promise.resolve(new Uint8Array()),
    headers: new Headers(),
    url: '',
    type: 'basic' as Response['type'],
    redirected: false,
    statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
    clone: vi.fn(),
    body: null,
    bodyUsed: false,
  } as unknown as Response;
};

export const mockFetchEmployees = (count = 3) => {
  const employees = createMockEmployeeList(count);
  vi.mocked(fetch).mockResolvedValueOnce(mockFetchResponse(employees));
  return employees;
};

export const mockFetchError = (message = 'Network Error') => {
  vi.mocked(fetch).mockRejectedValue(new Error(message));
};

export const resetFetchMock = () => {
  vi.mocked(fetch).mockReset();
};
