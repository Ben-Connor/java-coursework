import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Graphs from './Graphs';

describe('Graphs Component', () => {
  it('renders without crashing', () => {
    render(<Graphs />);
    // Check if the "Macro Bar Chart!" text is rendered
    expect(screen.getByText(/Macro Bar Chart!/)).toBeInTheDocument();
  });
});
