import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ManualFoodEntry from './ManualFoodEntry';

describe('ManualFoodEntry Component', () => {
  it('should render the form fields correctly', () => {
    render(<ManualFoodEntry />);

    expect(screen.getByLabelText(/Food Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Calories/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Protein \(g\)/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Carbs \(g\)/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fat \(g\)/)).toBeInTheDocument();
    expect(screen.getByText(/Vitamins & Micronutrients/)).toBeInTheDocument();
  });

  it('should update the food name input when typed into', () => {
    render(<ManualFoodEntry />);

    const foodNameInput = screen.getByLabelText(/Food Name/) as HTMLInputElement;
    fireEvent.change(foodNameInput, { target: { value: 'Apple' } });

    expect(foodNameInput.value).toBe('Apple');
  });

  it('should update the calories input when typed into', () => {
    render(<ManualFoodEntry />);

    const caloriesInput = screen.getByLabelText(/Calories/) as HTMLInputElement;
    fireEvent.change(caloriesInput, { target: { value: '95' } });

    expect(caloriesInput.value).toBe('95');
  });

  it('should add a vitamin when the "Add Vitamin" button is clicked', () => {
    render(<ManualFoodEntry />);

    // Initially there are no vitamin fields
    expect(screen.queryByPlaceholderText(/Vitamin Name/)).not.toBeInTheDocument();

    const addVitaminButton = screen.getByText(/Add Vitamin/);
    fireEvent.click(addVitaminButton);

    // After clicking "Add Vitamin", the vitamin input fields should appear
    expect(screen.getByPlaceholderText(/Vitamin Name/)).toBeInTheDocument();
  });

  it('should update the vitamin inputs correctly', () => {
    render(<ManualFoodEntry />);

    // Add a vitamin field
    fireEvent.click(screen.getByText(/Add Vitamin/));

    const vitaminNameInput = screen.getByPlaceholderText(/Vitamin Name/) as HTMLInputElement;
    const vitaminAmountInput = screen.getByPlaceholderText(/Amount/) as HTMLInputElement;
    
    fireEvent.change(vitaminNameInput, { target: { value: 'Vitamin C' } });
    fireEvent.change(vitaminAmountInput, { target: { value: '50' } });

    expect(vitaminNameInput.value).toBe('Vitamin C');
    expect(vitaminAmountInput.value).toBe('50');
  });

  it('should submit the form with correct data', () => {
    render(<ManualFoodEntry />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Food Name/) as HTMLInputElement, { target: { value: 'Banana' } });
    fireEvent.change(screen.getByLabelText(/Calories/) as HTMLInputElement, { target: { value: '105' } });
    fireEvent.change(screen.getByLabelText(/Protein \(g\)/) as HTMLInputElement, { target: { value: '1.3' } });
    fireEvent.change(screen.getByLabelText(/Carbs \(g\)/) as HTMLInputElement, { target: { value: '27' } });
    fireEvent.change(screen.getByLabelText(/Fat \(g\)/) as HTMLInputElement, { target: { value: '0.3' } });

    // Add vitamin C
    fireEvent.click(screen.getByText(/Add Vitamin/));
    fireEvent.change(screen.getByPlaceholderText(/Vitamin Name/) as HTMLInputElement, { target: { value: 'Vitamin C' } });
    fireEvent.change(screen.getByPlaceholderText(/Amount/) as HTMLInputElement, { target: { value: '30' } });

    // Submit the form
    const submitButton = screen.getByText(/Submit/);
    fireEvent.click(submitButton);

    // Check if the submit action occurs
    expect(screen.getByText(/Food entry submitted successfully!/)).toBeInTheDocument();
  });

  it('should log the correct food data on form submission', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<ManualFoodEntry />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Food Name/) as HTMLInputElement, { target: { value: 'Apple' } });
    fireEvent.change(screen.getByLabelText(/Calories/) as HTMLInputElement, { target: { value: '95' } });
    fireEvent.change(screen.getByLabelText(/Protein \(g\)/) as HTMLInputElement, { target: { value: '0.5' } });
    fireEvent.change(screen.getByLabelText(/Carbs \(g\)/) as HTMLInputElement, { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/Fat \(g\)/) as HTMLInputElement, { target: { value: '0.3' } });

    fireEvent.click(screen.getByText(/Add Vitamin/));
    fireEvent.change(screen.getByPlaceholderText(/Vitamin Name/) as HTMLInputElement, { target: { value: 'Vitamin C' } });
    fireEvent.change(screen.getByPlaceholderText(/Amount/) as HTMLInputElement, { target: { value: '10' } });

    fireEvent.click(screen.getByText(/Submit/));

    expect(consoleSpy).toHaveBeenCalledWith('Food Data Submitted:', {
      name: 'Apple',
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      vitamins: [{ name: 'Vitamin C', amount: 10, unit: 'mg' }],
    });

    consoleSpy.mockRestore();
  });
});
