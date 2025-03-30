import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FoodSearch from './FoodSearch';

// Mock the fetch API globally using globalThis
globalThis.fetch = vi.fn();

describe('FoodSearch Component', () => {
  it('renders without crashing', () => {
    render(<FoodSearch />);
    expect(screen.getByText(/Food Search/)).toBeInTheDocument();
  });

  it('updates the search query when the user types in the input field', () => {
    render(<FoodSearch />);
    const input = screen.getByPlaceholderText(/Search for food.../);
    fireEvent.change(input, { target: { value: 'apple' } });
    expect(input).toHaveValue('apple');
  });

  it('shows loading text when the search is being processed', async () => {
    render(<FoodSearch />);

    // Simulate the fetch process by mocking its resolved value
    (globalThis.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        foods: [],
      }),
    });

    const input = screen.getByPlaceholderText(/Search for food.../);
    fireEvent.change(input, { target: { value: 'apple' } });
    fireEvent.submit(screen.getByRole('button'));

    // Check if loading text appears
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it('shows an error message when no products are found', async () => {
    render(<FoodSearch />);

    // Simulate the fetch process with no products found
    (globalThis.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        foods: [],
      }),
    });

    const input = screen.getByPlaceholderText(/Search for food.../);
    fireEvent.change(input, { target: { value: 'apple' } });
    fireEvent.submit(screen.getByRole('button'));

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/No products found for your search/)).toBeInTheDocument();
    });
  });

  it('shows an error message when the API call fails', async () => {
    render(<FoodSearch />);

    // Simulate a failed fetch
    (globalThis.fetch as vi.Mock).mockRejectedValueOnce(new Error('API error'));

    const input = screen.getByPlaceholderText(/Search for food.../);
    fireEvent.change(input, { target: { value: 'apple' } });
    fireEvent.submit(screen.getByRole('button'));

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/An error occurred while fetching data/)).toBeInTheDocument();
    });
  });

  it('displays food data when products are found', async () => {
    render(<FoodSearch />);

    // Simulate successful fetch with mock data
    (globalThis.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        foods: [
          {
            fdcId: 123,
            description: 'Apple',
            brandOwner: 'Brand A',
            foodCategory: 'Fruit',
            foodNutrients: [
              { nutrientName: 'Calories', value: 52, unitName: 'kcal' },
              { nutrientName: 'Fat', value: 0.2, unitName: 'g' },
            ],
            imageUrl: 'https://example.com/apple.jpg',
          },
        ],
      }),
    });

    const input = screen.getByPlaceholderText(/Search for food.../);
    fireEvent.change(input, { target: { value: 'apple' } });
    fireEvent.submit(screen.getByRole('button'));

    // Wait for the food data to appear
    await waitFor(() => {
      expect(screen.getByText(/Apple/)).toBeInTheDocument();
      expect(screen.getByText(/Brand A/)).toBeInTheDocument();
      expect(screen.getByText(/Fruit/)).toBeInTheDocument();
      expect(screen.getByText(/Calories: 52 kcal/)).toBeInTheDocument();
      expect(screen.getByText(/Fat: 0.2 g/)).toBeInTheDocument();
    });
  });
});
