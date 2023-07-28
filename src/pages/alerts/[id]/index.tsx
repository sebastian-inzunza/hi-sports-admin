import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AppLayout from '@/components/layout/app'
import { useAlertEditMutation, useAlertQuery } from '@/data/alert'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Card from '@/components/common/card'

import StickerCard from '@/components/widgets/sticker-card'
import { PinMap } from '@/components/icons/sidebar/pin-map-icon'
import { UsersIcon } from '@/components/icons/sidebar'
import { Bell } from '@/components/icons/sidebar/bell'
import GoogleMap from '@/components/map/googlemap'
import { useState } from 'react'
import { Routes } from '@/config/routes'
import Label from '@/components/ui/label'
import { AlertStatus, AlertStatusArray } from '@/types/alerts'
import { useTranslation } from 'react-i18next'
import Select from '@/components/select/select'
import { useMeQuery } from '@/data/user'

export default function AlertDetail() {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: me, isLoading: meLoading } = useMeQuery()

  const { mutate: editAlert, isLoading: editing } = useAlertEditMutation()
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 37.78746222,
    lng: -122.412923,
  })

  const [zoom, setZoom] = useState<number>(15)

  const {
    query: { id },
  } = router

  const { alert, error, loading } = useAlertQuery({
    id: Number(id),
  })

  if (loading) return <Loader />

  if (error) return <ErrorMessage message={'error'} />

  const onMarkerClick = (payload: any) => {
    console.log('marker clicked', payload)
  }

  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom()!)

    const nextCenter = map.getCenter()

    if (nextCenter) {
      setCenter(nextCenter.toJSON())
    }
  }

  const onSubmit = (data: any) => {
    console.log('Status received', data)
    editAlert({
      id: alert?.id.toString() ?? '',
      status: data.value,
      attendedBy: me?.id,
    })
  }

  return (
    <>
      <Card className="mb-8">
        {/* Put to the end of the page the select */}
        <div className="mb-4 flex w-full flex-col sm:flex-row sm:items-center sm:justify-between">
          <Label className="mb-2 sm:mb-0">Estatus de la alerta</Label>
          <Select
            name="status"
            getOptionLabel={(option: any) => option.value}
            getOptionValue={(option: any) => option.value}
            options={AlertStatusArray}
            isLoading={editing}
            onChange={(e: any) => {
              onSubmit(e)
            }}
            placeholder={'Alert status'}
            defaultValue={
              AlertStatusArray.find((item) => item.value === alert?.status) ??
              ''
            }
          />
        </div>
        <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <div className="w-full">
            <StickerCard
              titleTransKey="Estatus de la alerta"
              subtitleTransKey="La alerta se encuentra en el siguiente estatus"
              icon={<Bell className="h-7 w-7" color="#ffff" />}
              iconBgStyle={{ backgroundColor: '#ffd7a3' }}
              price={t('form:' + alert?.status)}
            />
          </div>
          <div className="w-full">
            <StickerCard
              titleTransKey="Geolocalización de la alerta"
              subtitleTransKey="Ubicación de la alerta"
              icon={<PinMap className="h-7 w-7" color="#00a29e" />}
              iconBgStyle={{ backgroundColor: '#e4e7eb' }}
              price={alert?.latitude + ' ' + alert?.longitude}
            />
          </div>
          <div className="w-full">
            <StickerCard
              titleTransKey="Usuario que generó la alerta"
              subtitleTransKey="Nombre del usuario"
              icon={<UsersIcon className="h-7 w-7" color="#d60000" />}
              iconBgStyle={{ backgroundColor: '#ffafaf' }}
              price={alert?.user?.name}
              className="w-full border-2 border-gray-200"
              link={Routes.users.details({
                id: alert?.user?.id?.toString() ?? '',
              })}
              linkText="Ver información del usuario"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium leading-6 text-gray-700 hover:text-gray-900">
            Última ubicación del usuario que generó la alerta
          </h3>
        </div>

        {/* Map */}
        <div className="relative h-screen">
          <GoogleMap
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}
            center={center}
            zoom={zoom}
            markers={[]}
            onIdle={onIdle}
            onMarkerClick={onMarkerClick}
            highlightedMarkerId={alert?.id.toString()}
          />
        </div>
      </Card>
    </>
  )
}

AlertDetail.Layout = AppLayout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'form', 'table'])),
  },
})
