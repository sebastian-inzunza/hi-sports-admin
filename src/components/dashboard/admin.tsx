/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
// Import dayjs
import dayjs from 'dayjs'

import { useAnalyticsQuery } from '@/data/analytics'
import ColumnChart from '@/components/widgets/column-chart'

import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader'
import StickerCard from '@/components/widgets/sticker-card'
import { UsersIcon } from '../icons/sidebar'
import Card from '../common/card'
import { SocketContext } from '@/contexts/sockets.context'
import Toast from '../ui/toast'
import { useUI } from '@/contexts/ui.context'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()

  const { analytics, error, loading } = useAnalyticsQuery()
  const { online, alert } = useContext(SocketContext)
  const { displayToaster } = useUI()

  const [selected, setSelected] = useState(false)
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  if (loading) return <Loader text="Cargando Analytics..." />

  if (error) return <ErrorMessage message={error.message} />

  if (!online) return <ErrorMessage message="No hay conexión" />

  const handleValueChange = (value: any) => {
    if (value.startDate === null || value.endDate === null) {
      setSelected(false)
    } else {
      setSelected(true)
    }
    setValue(value)
  }

  function formatDate(date: Date) {
    // format with day js like: 16 Agosto 2018
    return dayjs(date).format('DD MMMM, YYYY')
  }

  function selectAlert() {
    router.push(`/alerts`)
  }

  return (
    <>
      <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="w-full ">
          <StickerCard
            icon={<UsersIcon className="h-7 w-7" color="#047857" />}
            title="Total de Usuario"
            subtitle="(Últimos 30 días)"
            iconBgStyle={{ backgroundColor: '#A7F3D0' }}
            total={analytics.usersCount}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            icon={<UsersIcon className="h-7 w-7" color="#1D4ED8" />}
            title="Total de Alertas"
            subtitle="(Últimos 30 días)"
            iconBgStyle={{ backgroundColor: '#93C5FD' }}
            total={analytics.alertsCount}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            icon={<UsersIcon className="h-7 w-7" color="#1D4ED8" />}
            title="Total de Notas"
            subtitle="(Últimos 30 días)"
            iconBgStyle={{ backgroundColor: '#93C5FD' }}
            total={analytics.notesCount}
          />
        </div>
      </div>
      <div className="mb-6 flex w-full flex-wrap md:flex-nowrap">
        <ColumnChart />
      </div>
      {/* Title "Reportes" */}
      <div className="mb-6 flex w-full flex-wrap md:flex-nowrap">
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-gray-700">Reportes</h2>
        </div>
      </div>
      {/* Create Column */}
      <Card>
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2">
          <div className="w-full">
            <Datepicker
              primaryColor={'sky'}
              value={value}
              onChange={handleValueChange}
              maxDate={new Date()}
              minDate={new Date('2021-01-01')}
              displayFormat="DD/MM/YYYY"
            />
          </div>
          <div className="w-full">
            {/* Put here range selected with format like 23 Jun 2023 */}
            <div className="flex justify-center col-span-2 mb-4">
              <p className="text-gray-700 text-center">
                {selected
                  ? `${formatDate(value.startDate)} | ${formatDate(
                      value.endDate
                    )}`
                  : 'Seleccione un rango de fechas'}
              </p>
            </div>

            {/* Center button */}
            <div className="flex justify-center col-span-2">
              <button
                className="font-bold py-2 px-4 rounded text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:shadow-outline disabled:opacity-50"
                disabled={!selected}
              >
                Descargar Reporte
              </button>
            </div>
          </div>
        </div>
      </Card>
      {displayToaster && <Toast alert={alert} viewAlert={selectAlert} />}
    </>
  )
}
