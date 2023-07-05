import AlertList from '@/components/alert/alert-list'
import { AlertStatus } from '@/types/alerts'
import { render, screen } from '@testing-library/react'

describe('testing for alert', () => {
  it('render message component', async () => {
    render(
      <AlertList
        alerts={[]}
        seletedAlert={() => {}}
        onPagination={() => {}}
        paginatorInfo={null}
      />
    )
    const alertElements = screen.getByTestId('container1')
    expect(alertElements).toBeInTheDocument()
  })

  it('render containers', () => {
    render(
      <AlertList
        alerts={[
          {
            id: 1,
            content: '',
            image: '',
            userId: 1,
            status: AlertStatus.FalseAlarm,
            latitude: 36.1248871,
            longitude: 115.3398077,
            createdAt: '',
            updatedAt: '',
          },
        ]}
        seletedAlert={() => {}}
        onPagination={() => {}}
        paginatorInfo={null}
      />
    )
    const container2 = screen.getByTestId('container2')
    expect(container2).toBeInTheDocument()

    const h2testid1 = screen.getByTestId('h2testid1')
    expect(h2testid1).toBeInTheDocument()

    const container3 = screen.getByTestId('container3')
    expect(container3).toBeInTheDocument()

    const container4 = screen.getByTestId('container4')
    expect(container4).toBeInTheDocument()

    const container5 = screen.getByTestId('container5')
    expect(container5).toBeInTheDocument()

    const container6 = screen.getByTestId('container6')
    expect(container6).toBeInTheDocument()

    const container7 = screen.getByTestId('container7')
    expect(container7).toBeInTheDocument()
  })
})
