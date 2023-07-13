import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Datepicker from 'react-tailwindcss-datepicker'
import dayjs from 'dayjs'

import StickerCard from '@/components/widgets/sticker-card'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import { Bell } from '@/components/icons/sidebar/bell'
import { NotesIcon } from '@/components/icons/notes-icon'

import { useAnalyticsQuery } from '@/data/analytics'
import Card from '../common/card'
import { UserIcon } from '../icons/user-icon'

export default function Dashboard() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(false)
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })
  const { analytics, loading, error } = useAnalyticsQuery()

  if (loading) {
    return <Loader text={t('common:text-loading') ?? ''} />
  }
  if (error) {
    return <ErrorMessage message={error?.message} />
  }

  const handleValueChange = (value: any) => {
    if (value.startDate === null || value.endDate === null) {
      setSelected(false)
    } else {
      setSelected(true)
    }
    setValue(value)
  }

  function formatDate(date: Date) {
    return dayjs(date).format('DD MMMM, YYYY')
  }

  return (
    <>
      <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="w-full">
          <StickerCard
            titleTransKey="sticker-card-title-rev"
            subtitleTransKey="sticker-card-subtitle-rev"
            icon={<Bell className="h-7 w-7" color="#d60000" />}
            iconBgStyle={{ backgroundColor: '#ffafaf' }}
            price={analytics.alertsCount}
          />
        </div>
        <div className="w-full">
          <StickerCard
            titleTransKey="sticker-card-title-order"
            subtitleTransKey="sticker-card-subtitle-order"
            icon={<NotesIcon />}
            price={analytics?.notesCount}
          />
        </div>
        <div className="w-full">
          <StickerCard
            titleTransKey="sticker-card-title-today-rev"
            icon={<UserIcon />}
            price={analytics.usersCount}
          />
        </div>
      </div>

      <Card className="mb-6 w-full xl:mb-0">
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
            <div className="col-span-2 mb-4 flex justify-center">
              <p className="text-center text-gray-700">
                {selected
                  ? `${formatDate(value.startDate)} | ${formatDate(
                      value.endDate
                    )}`
                  : 'Seleccione un rango de fechas'}
              </p>
            </div>

            {/* Center button */}
            <div className="col-span-2 flex justify-center">
              <button
                className="focus:shadow-outline rounded bg-blue-800 px-4 py-2 font-bold text-white hover:bg-blue-900 focus:outline-none disabled:opacity-50"
                disabled={!selected}
              >
                Descargar Reporte
              </button>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
