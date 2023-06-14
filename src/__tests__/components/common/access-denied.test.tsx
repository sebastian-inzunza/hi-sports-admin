import React from 'react'
import { render, screen } from '@testing-library/react'
import AccessDeniedPage from '@/components/common/access-denied'

describe('Access Denied Component', () => {
  it('should render access denied component', () => {
    render(<AccessDeniedPage />)
    const accessDenied = screen.getByTestId('access-denied')
    expect(accessDenied).toBeInTheDocument()
  })

  // Must contain Access Denied
  it('should render access denied component with text', () => {
    render(<AccessDeniedPage />)
    const accessDenied = screen.getByText('Access Denied')
    const accessDeniedText = screen.getByText(
      "you don't have permission to access this page."
    )
    expect(accessDenied).toBeInTheDocument()
    expect(accessDeniedText).toBeInTheDocument()
  })

  // Must contain Go back link
  it('should render access denied component with go back link', () => {
    render(<AccessDeniedPage />)
    const goBackLink = screen.getByText('Go back')
    expect(goBackLink).toBeInTheDocument()
  })

  // Must to be a link to home page and redirect to home page
  it('should render access denied component with go back link and redirect to home page', () => {
    render(<AccessDeniedPage />)
    const goBackLink = screen.getByText('Go back')
    expect(goBackLink).toBeInTheDocument()
    expect(goBackLink).toHaveAttribute('href', '/')
  })
})
