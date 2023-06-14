import React from 'react'
import { render, screen } from '@testing-library/react'
import ConfirmationCard from '@/components/common/confirmation-card'

describe('Confirmation Card Component', () => {
  it('should render confirmation card component', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
    const confirmationCard = screen.getByTestId('confirmation-card')
    expect(confirmationCard).toBeInTheDocument()
  })

  it('should render confirmation card component with dynamic title', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        title="Confirmation"
      />
    )
    const confirmationCard = screen.getByText('Confirmation')
    expect(confirmationCard).toBeInTheDocument()
  })

  it('should render confirmation card component with dynamic description', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        description="Do you want to delete this element?"
      />
    )
    const confirmationCard = screen.getByText(
      'Do you want to delete this element?'
    )
    expect(confirmationCard).toBeInTheDocument()
  })

  it('should render confirmation card component with dynamic icon', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        icon={<div>Icon</div>}
      />
    )
    const confirmationCard = screen.getByText('Icon')
    expect(confirmationCard).toBeInTheDocument()
  })

  it('should render confirmation card component with cancel button', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
    const cancelButton = screen.getByText('Cancelar')
    expect(cancelButton).toBeInTheDocument()
  })

  it('should render confirmation card component with delete button with cancel id delete-btn', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
    const deleteButton = screen.getByTestId('delete-btn')
    expect(deleteButton).toBeInTheDocument()
  })

  // Must contain dynamic cancel button text
  it('should render confirmation card component with dynamic cancel button text', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        cancelBtnText="Cancel"
      />
    )
    const cancelButton = screen.getByText('Cancel')
    expect(cancelButton).toBeInTheDocument()
  })

  it('should render confirmation card component with dynamic delete button text', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        deleteBtnText="Delete"
      />
    )
    const deleteButton = screen.getByText('Delete')
    expect(deleteButton).toBeInTheDocument()
  })

  it('should render confirmation card component with dynamic cancel button class name', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        cancelBtnClassName="cancel-btn"
      />
    )
  })

  it('should render confirmation card component with dynamic delete button class name', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        deleteBtnClassName="delete-btn"
      />
    )
  })

  it('should render confirmation card component with dynamic cancel button loading', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        cancelBtnLoading={true}
      />
    )
  })

  it('should render confirmation card component with dynamic delete button loading', () => {
    render(
      <ConfirmationCard
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        deleteBtnLoading={true}
      />
    )
  })
})
