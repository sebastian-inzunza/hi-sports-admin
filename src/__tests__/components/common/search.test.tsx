/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { render, screen } from '@testing-library/react'

import Search from '@/components/common/search'

describe('Search Component', () => {
  it('should render search component', () => {
    render(<Search onSearch={() => {}} />)
    const search = screen.getByTestId('search')
    expect(search).toBeInTheDocument()
  })

  it('should render search component with dynamic className', () => {
    render(<Search onSearch={() => {}} className="test" />)
    const search = screen.getByTestId('search')
    expect(search).toHaveClass('test')
  })
})
