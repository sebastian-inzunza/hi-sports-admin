import AccessDeniedPage from '@/components/common/access-denied'
import { render, screen } from '@testing-library/react'

describe('Access Denied Component', () => {
  it('test_renders_component_without_errors', () => {
    render(<AccessDeniedPage />)
    expect(screen.getByText('text-access-denied')).toBeInTheDocument()
    expect(screen.getByText('text-access-denied-message')).toBeInTheDocument()
    expect(screen.getByText('text-return-home')).toBeInTheDocument()
  })
})
