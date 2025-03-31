import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FoodSearch from './FoodSearch';

describe('FoodSearch Component', () => {
  it('renders without crashing', () => {
    render(<FoodSearch />);
    expect(screen.getByText(/Food Search/)).toBeInTheDocument();
  });
});
