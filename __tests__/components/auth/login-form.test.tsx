import LoginForm from '@/components/auth/login-form'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'

describe.only('LoginForm', () => {
  let queryClient: QueryClient

  beforeAll(() => {
    queryClient = new QueryClient()
  })

  test('renders login form and handles form submission', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    )

    // Input fields
    const emailInput = screen.getByLabelText('form:input-label-email')
    const passwordInput = screen.getByLabelText('form:input-label-password')

    // Fill in the input fields
    userEvent.type(emailInput, 'test@example.com')
    userEvent.type(passwordInput, 'password123')

    // Submit the form
    const loginButton = screen.getByText('form:button-label-login')
    userEvent.click(loginButton)

    // Wait for the form submission to complete
    await waitFor(() => {
      // Assertions
      expect(screen.queryByText('Login')).toBeNull() // Login button should disappear after submission
      expect(screen.queryByText('Actualiza tu contraseña')).toBeNull() // Login button should disappear after submission
      expect(screen.queryByLabelText('Email')).toBeNull() // Email input should disappear after submission
      expect(screen.queryByLabelText('Password')).toBeNull() // Password input should disappear after submission
      expect(screen.queryByText('Contraseña')).toBeNull()
      expect(screen.queryByText('Actualiza tu contraseña')).toBeNull()
      expect(screen.queryByLabelText('Nueva contraseña')).toBeNull()
      expect(screen.queryByLabelText('Confirmar contraseña')).toBeNull()
      expect(screen.queryByText('Actualizar contraseña')).toBeInTheDocument
      expect(screen.queryByText('Error')).toBeNull
    })
  })
})
