// Logo component
import Logo from '@/components/ui/logo'
import { Routes } from '@/config/routes'
import { render, screen } from '@testing-library/react'

describe('Logo component', () => {
  it('test_renders_component_without_errors', () => {
    // Render the logo
    render(<Logo />)

    // Check if the logo is rendered with the correct text
    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()

    // Check if the logo has the correct attributes
    expect(screen.getByRole('link')).toHaveAttribute('href', Routes.dashboard)
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Kali Connect')
  })
})
