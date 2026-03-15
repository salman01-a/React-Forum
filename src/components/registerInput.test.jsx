/** @vitest-environment happy-dom */
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './registerInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Nama Lengkap');

    await userEvent.type(nameInput, 'Salman Faris');

    expect(nameInput).toHaveValue('Salman Faris');
  });

  it('should handle email typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'salman@example.com');

    expect(emailInput).toHaveValue('salman@example.com');
  });

  it('should handle password typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password (minimal 6 karakter)');

    await userEvent.type(passwordInput, 'rahasia123');

    expect(passwordInput).toHaveValue('rahasia123');
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);

    const nameInput = await screen.getByPlaceholderText('Nama Lengkap');
    await userEvent.type(nameInput, 'Salman Faris');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'salman@example.com');
    const passwordInput = await screen.getByPlaceholderText('Password (minimal 6 karakter)');
    await userEvent.type(passwordInput, 'rahasia123');
    const registerButton = await screen.getByRole('button', { name: 'Daftar' });
    await userEvent.click(registerButton);

    expect(mockRegister).toBeCalledWith({
      name: 'Salman Faris',
      email: 'salman@example.com',
      password: 'rahasia123',
    });
  });
});