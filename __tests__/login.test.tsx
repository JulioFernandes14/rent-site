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
import { render, screen } from '@testing-library/react-native';
import Login from '../app/index';

describe('Login screen', () => {
  it('renders title and inputs', () => {
    render(<Login />);

    expect(screen.getByText('Gerenciador de Aluguel')).toBeTruthy();
    expect(screen.getByText('Faça login para acessar o sistema')).toBeTruthy();

    expect(screen.getByPlaceholderText('username')).toBeTruthy();
    expect(screen.getByPlaceholderText('senha')).toBeTruthy();

    expect(screen.getByText('Entrar')).toBeTruthy();
  });
});
/// <reference types="jest" />