
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));


jest.mock('../app/_http/auth_http/routes/auth', () => ({
  login: jest.fn(async () => ({
    access_token: 'test-token',
    email: 'test@example.com',
    username: 'tester',
    id: 1,
  })),
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Login from '../app/index';

describe('Login validation', () => {
  it('shows errors when submitting empty fields', () => {
    render(<Login />);

    const submit = screen.getByText('Entrar');
    fireEvent.press(submit);

    expect(screen.getByText('Campo usuário é obrigatório')).toBeTruthy();
  });

  it('shows password error when username is provided but password empty', () => {
    render(<Login />);

    const usernameInput = screen.getByPlaceholderText('username');
    fireEvent.changeText(usernameInput, 'user');

    const submit = screen.getByText('Entrar');
    fireEvent.press(submit);

    expect(screen.getByText('Campo senha é obrigatório')).toBeTruthy();
  });
});
/// <reference types="jest" />