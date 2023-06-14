import React from 'react'
import { render, screen } from '@testing-library/react'
import Avatar from '@/components/common/avatar'

describe('Avatar component', () => {
  it('should render avatar component', () => {
    render(<Avatar src="https://avatars.githubusercontent.com/u/1?v=4" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toBeInTheDocument()
  })

  it('should render avatar component with custom class', () => {
    render(
      <Avatar
        src="https://avatars.githubusercontent.com/u/1?v=4"
        className="test"
      />
    )
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveClass('test')
  })

  it('should render avatar component with custom alt', () => {
    render(
      <Avatar src="https://avatars.githubusercontent.com/u/1?v=4" alt="test" />
    )
    const avatar = screen.getByLabelText('test')
    expect(avatar).toBeInTheDocument()
  })
})
