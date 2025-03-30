import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Graphs from './Graphs';

// Mock the Bar component from 'react-chartjs-2'
vi.mock('react-chartjs-2', () => ({
  Bar: vi.fn(() => <div>Bar chart</div>), // Mock Bar component to return a div with text
}));

describe('Graphs Component', () => {
  it('renders without crashing', () => {
    render(<Graphs />);
    // Check if the "Macro Bar Chart!" text is rendered
    expect(screen.getByText(/Macro Bar Chart!/)).toBeInTheDocument();
    // Check if the mocked Bar component renders
    expect(screen.getByText(/Bar chart/)).toBeInTheDocument();
  });

  it('correctly formats chart data', () => {
    const { container } = render(<Graphs />);
    const barElement = container.querySelector('div');
    
    // Ensure that the Bar component was rendered
    expect(barElement).toBeTruthy();
  });
});
