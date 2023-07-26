import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AppLayout from '@/components/layout/app'
import { useAlertQuery } from '@/data/alert'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Card from '@/components/common/card'

import { useForm } from 'react-hook-form'
import StickerCard from '@/components/widgets/sticker-card'
import { PinMap } from '@/components/icons/sidebar/pin-map-icon'
import { UsersIcon } from '@/components/icons/sidebar'
import { Bell } from '@/components/icons/sidebar/bell'
import GoogleMap from '@/components/map/googlemap'
import { useState } from 'react'
import { Routes } from '@/config/routes'

export default function AlertDetail() {
  const router = useRouter()
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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      ...alert,
    },
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

  return (
    <>
      <Card className="mb-8">
        <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <div className="w-full">
            <StickerCard
              titleTransKey="Alerta"
              subtitleTransKey="Estatus actual de la alerta"
              icon={<Bell className="h-7 w-7" color="#ffff" />}
              iconBgStyle={{ backgroundColor: '#ffd7a3' }}
              price={alert?.status}
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

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

AlertDetail.Layout = AppLayout
