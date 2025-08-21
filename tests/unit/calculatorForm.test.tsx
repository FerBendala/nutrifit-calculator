import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CalculatorForm } from '@/components/CalculatorForm';

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('CalculatorForm', () => {
  it('renders all form fields', () => {
    render(<CalculatorForm />);
    
    expect(screen.getByLabelText(/sexo biológico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/edad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/altura/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/peso/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nivel de actividad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/objetivo/i)).toBeInTheDocument();
  });

  it('disables submit button when form is incomplete', () => {
    render(<CalculatorForm />);
    
    const submitButton = screen.getByRole('button', { name: /calcular mis calorías/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when form is complete', async () => {
    render(<CalculatorForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/edad/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/altura/i), { target: { value: '180' } });
    fireEvent.change(screen.getByLabelText(/peso/i), { target: { value: '80' } });
    
    // Select activity level (this requires interacting with the Select component)
    const activitySelect = screen.getByLabelText(/nivel de actividad/i);
    fireEvent.click(activitySelect);
    
    await waitFor(() => {
      const moderateOption = screen.getByText(/moderada/i);
      fireEvent.click(moderateOption);
    });

    const submitButton = screen.getByRole('button', { name: /calcular mis calorías/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('shows validation errors for invalid inputs', async () => {
    render(<CalculatorForm />);
    
    const ageInput = screen.getByLabelText(/edad/i);
    fireEvent.change(ageInput, { target: { value: '5' } });
    fireEvent.blur(ageInput);
    
    await waitFor(() => {
      expect(screen.getByText(/el valor debe ser mayor a/i)).toBeInTheDocument();
    });
  });

  it('calculates and displays results when form is submitted', async () => {
    render(<CalculatorForm />);
    
    // Fill in valid form data
    fireEvent.change(screen.getByLabelText(/edad/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/altura/i), { target: { value: '180' } });
    fireEvent.change(screen.getByLabelText(/peso/i), { target: { value: '80' } });
    
    // Select activity level
    const activitySelect = screen.getByLabelText(/nivel de actividad/i);
    fireEvent.click(activitySelect);
    
    await waitFor(() => {
      const moderateOption = screen.getByText(/moderada/i);
      fireEvent.click(moderateOption);
    });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /calcular mis calorías/i });
    fireEvent.click(submitButton);
    
    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText(/tus resultados/i)).toBeInTheDocument();
      expect(screen.getByText(/tdee/i)).toBeInTheDocument();
      expect(screen.getByText(/calorías objetivo/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('has accessible form labels and ARIA attributes', () => {
    render(<CalculatorForm />);
    
    const ageInput = screen.getByLabelText(/edad/i);
    expect(ageInput).toHaveAttribute('required');
    
    const heightInput = screen.getByLabelText(/altura/i);
    expect(heightInput).toHaveAttribute('min', '130');
    expect(heightInput).toHaveAttribute('max', '250');
  });
});