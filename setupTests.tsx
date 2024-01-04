import '@testing-library/jest-dom';
import { vi } from 'vitest';
// import { BrowserRouter } from 'react-router-dom';

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: vi.fn().mockImplementation((query) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: vi.fn(), // deprecated
//     removeListener: vi.fn(), // deprecated
//     addEventListener: vi.fn(),
//     removeEventListener: vi.fn(),
//     dispatchEvent: vi.fn(),
//   })),
// });

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <BrowserRouter>
//       <ChakraProvider theme={theme}>
//         <AuthProvider>{children}</AuthProvider>
//       </ChakraProvider>
//     </BrowserRouter>
//   );
// };

// const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
//   render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
// export { customRender as render };
