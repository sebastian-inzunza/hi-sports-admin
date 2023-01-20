import Chart from '@/components/ui/chart'
// import cn from 'classnames'
import { ArrowUp } from '@/components/icons/arrow-up'
// import { ArrowDown } from '@/components/icons/arrow-down'

const BarChart = () => {
  const options = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '65%',
          endingShape: 'flat',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 2,
      },
      grid: {
        borderColor: '#F7F7F7',
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      colors: ['#03D3B5'],
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            color: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
        },
      },
    },
    series: [
      {
        name: 'Alertas Solucionadas',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  }

  return (
    <div className="h-full w-full rounded bg-light shadow-sm">
      <div className="flex items-center justify-between p-8">
        <h3 className="text-sm text-heading">Gráfica de Alertas</h3>

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-green-500">Total</span>

          <div className="flex items-center">
            <span className="text-green-500">
              <ArrowUp />
            </span>

            <span className="ms-1 text-sm text-heading">
              <span className="text-green-500">0.00%</span>
              Alertas Solucionadas
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap" style={{ display: 'block' }}>
        <Chart {...options} height="350" width="100%" type="bar" />
      </div>
    </div>
  )
}

export default BarChart
