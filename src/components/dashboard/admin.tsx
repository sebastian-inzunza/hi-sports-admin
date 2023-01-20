import { useAnalyticsQuery } from '@/data/analytics'
import ColumnChart from '@/components/widgets/column-chart'

import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader'
import StickerCard from '@/components/widgets/sticker-card'
import { UsersIcon } from '../icons/sidebar'

export default function Dashboard() {
  const { analytics, error, loading } = useAnalyticsQuery()

  if (loading) return <Loader text="Cargando Analytics..." />

  if (error) return <ErrorMessage message={error.message} />

  console.log('========== Analytics ==========')
  console.log(analytics)
  console.log('========== Analytics ==========')

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
    </>
  )
}
