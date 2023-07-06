import ProfileUpdateForm from '@/components/auth/profile-update-form'
import { render, screen } from '@testing-library/react'

describe('profile update', () => {
  test('profile update forms', () => {
    render(<ProfileUpdateForm />)

    const Labelinput = screen.getAllByLabelText('Correo electrónico')
    expect(Labelinput).toBeInTheDocument
    expect(screen.getByTitle('avatar'))
    expect(screen.getByText('Actualiza tu foto de perfil'))
    expect(screen.getByTitle('Nombre'))
    expect(screen.getByText('Actualiza tu nombre'))
    expect(screen.getByLabelText('Nombre'))
    expect(screen.getByLabelText('Apellido'))
    expect(screen.getByLabelText('Fecha de nacimiento'))
    expect(screen.getByLabelText('Fecha de registro'))
    expect(screen.getByLabelText('Rol'))
  })
})
