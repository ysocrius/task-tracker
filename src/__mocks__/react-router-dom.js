import React from 'react';

const reactRouterDom = {
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Navigate: ({ to }) => <div data-testid="navigate" data-to={to} />,
  useNavigate: () => jest.fn(),
};

module.exports = reactRouterDom; 