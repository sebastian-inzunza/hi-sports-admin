/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import GoogleMapReact from 'google-map-react'
import Card from '../common/card'
import { Pin } from '../icons/pin-icon'

const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

type Props = {
  lat?: number
  lng?: number
  text?: string
}

// Use memoization to avoid re-rendering the map

const PinComponent: any = () => <Pin />

const AlertMap = memo(({ lat, lng }: Props) => {
  const center = {
    lat: lat || 20.659698,
    lng: lng || -103.349609,
  }

  const zoom = 11

  return (
    <Card>
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key }}
          center={center}
          defaultZoom={zoom}
        >
          <PinComponent lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Card>
  )
})

export default AlertMap
