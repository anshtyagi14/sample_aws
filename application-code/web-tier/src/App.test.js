import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const learnReactLink = screen.getByText(/learn react/i);
  expect(learnReactLink).toBeInTheDocument();
});

test('menu starts closed', () => {
  render(<App />);
  const menu = screen.getByRole('menu', { hidden: true });
  expect(menu).toBeInTheDocument();
});

test('menu opens on burger click', () => {
  render(<App />);
  const burgerButton = screen.getByRole('button', { name: 'Open menu' });
  const menu = screen.getByRole('menu', { hidden: true });

  fireEvent.click(burgerButton);

  expect(menu).toBeVisible();
});

test('menu closes on outside click', () => {
  render(<App />);
  const burgerButton = screen.getByRole('button', { name: 'Open menu' });
  const menu = screen.getByRole('menu', { hidden: true });

  fireEvent.click(burgerButton);
  fireEvent.click(document.body);

  expect(menu).not.toBeVisible();
});

test('menu link works', () => {
  render(<App />);
  const burgerButton = screen.getByRole('button', { name: 'Open menu' });
  const learnReactLink = screen.getByText(/learn react/i);

  fireEvent.click(burgerButton);
  fireEvent.click(learnReactLink);

  expect(screen.getByText(/you clicked the link/i)).toBeInTheDocument();
});

