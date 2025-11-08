import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AccessibleInput } from './AccessibleInput';

describe('AccessibleInput', () => {
  it('must correctly render the input with the specified label', () => {
    render(<AccessibleInput label="Test Input" />);
    const input = screen.getByLabelText('Test Input');
    expect(input).toBeTruthy();
  });

  // Basic accessibility tests
  it('must comply with basic accessibility rules', async () => {
    const { container } = render(<AccessibleInput label="Accessible Input" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Required field tests
  it('must display required indicator when required', () => {
    render(<AccessibleInput label="Required Field" required />);
    const label = screen.getByText('*');
    expect(label).toBeTruthy();
    expect(label.getAttribute('aria-hidden')).toBe('true');
  });

  // Input value tests
  it('must handle input changes', () => {
    const handleChange = vi.fn();
    render(<AccessibleInput label="Input Test" onChange={handleChange} />);

    const input = screen.getByLabelText('Input Test');
    fireEvent.input(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledWith({ value: 'test value' });
  });

  // Blur event tests
  it('must handle blur events', () => {
    const handleBlur = vi.fn();
    render(<AccessibleInput label="Blur Test" onBlur={handleBlur} />);

    const input = screen.getByLabelText('Blur Test');
    fireEvent.input(input, { target: { value: 'test' } });
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledWith({ value: 'test' });
  });

  // Disabled state tests
  it('must correctly handle the disabled state', () => {
    render(<AccessibleInput label="Disabled Input" disabled />);

    const input = screen.getByLabelText('Disabled Input');
    expect(input).toBeDisabled();
  });

  // Error state tests
  it('must display error messages', () => {
    render(<AccessibleInput label="Error Input" error="This is an error" />);

    const errorMessage = screen.getByText('This is an error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.className).toContain('error-message');
  });

  it('must set aria-invalid when there is an error', () => {
    render(<AccessibleInput label="Invalid Input" error="Error message" />);

    const input = screen.getByLabelText('Invalid Input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  // Placeholder tests
  it('must display placeholder text', () => {
    render(<AccessibleInput label="Placeholder Test" placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeTruthy();
  });

  // Type attribute tests
  it('must support different input types', () => {
    render(<AccessibleInput label="Email Input" type="email" />);

    const input = screen.getByLabelText('Email Input');
    expect(input.getAttribute('type')).toBe('email');
  });

  // Readonly tests
  it('must handle readonly attribute', () => {
    render(<AccessibleInput label="Readonly Input" readonly />);

    const input = screen.getByLabelText('Readonly Input');
    expect(input).toHaveAttribute('readonly');
  });

  // Min/Max length tests
  it('must handle minlength and maxlength attributes', () => {
    render(<AccessibleInput label="Length Test" minlength={3} maxlength={10} />);

    const input = screen.getByLabelText('Length Test');
    expect(input.getAttribute('minlength')).toBe('3');
    expect(input.getAttribute('maxlength')).toBe('10');
  });

  // Pattern validation tests
  it('must handle pattern attribute', () => {
    render(<AccessibleInput label="Pattern Test" pattern="[0-9]*" />);

    const input = screen.getByLabelText('Pattern Test');
    expect(input.getAttribute('pattern')).toBe('[0-9]*');
  });

});
