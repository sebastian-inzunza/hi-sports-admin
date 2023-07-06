import Notes from '@/pages/blog'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('blog page', () => {
  let queryClient: QueryClient

  beforeAll(() => {
    queryClient = new QueryClient()
  })

  it('should render render page', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Notes />
      </QueryClientProvider>
    )

    expect(screen.getByText('..Cargando')).toBeInTheDocument()
    expect(screen.getByLabelText('Contenido')).toBeInTheDocument()
    expect(screen.getByLabelText('Slug')).toBeInTheDocument()
    expect(screen.getByLabelText('Titulo')).toBeInTheDocument()
    expect(screen.getByTitle('Imagen')).toBeInTheDocument()
    expect(screen.getByTitle('Nota')).toBeInTheDocument()
    expect(screen.getByTitle('Acciones')).toBeInTheDocument()
  })
})
