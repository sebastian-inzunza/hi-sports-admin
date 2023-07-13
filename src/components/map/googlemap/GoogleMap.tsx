import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { useMemo } from 'react'
import Map from '../Map'
import Marker from '@/components/map/custom/custom-marker'
import { Alert } from '@/types/alerts'

const render = (status: Status) => {
  if (status === Status.FAILURE) {
    return <p>failed</p>
  }
  return <p>loading...</p>
}

interface GoogleMapProps {
  onIdle?: (map: google.maps.Map) => void
  onClick?: (e: google.maps.MapMouseEvent) => void
  onMarkerClick: (payload: Alert) => void
  markers?: Alert[]
  center: google.maps.LatLngLiteral
  zoom: number
  apiKey: string
  highlightedMarkerId?: string
}

export default function GoogleMap({
  apiKey,
  onClick,
  onIdle,
  zoom,
  center,
  markers,
  onMarkerClick,
  highlightedMarkerId,
}: GoogleMapProps) {
  const filtered = useMemo(() => {
    return markers?.filter((m) => m.latitude && m.longitude)
  }, [markers])

  return (
    <div className="flex h-full">
      <Wrapper apiKey={apiKey} render={render}>
        <Map
          // Border radius is set to 0 to avoid a bug where the map is not clickable
          className="h-full w-full rounded"
          center={center}
          zoom={zoom}
          minZoom={2}
          maxZoom={18}
          onIdle={onIdle}
          onClick={onClick}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControl={false}
          clickableIcons={false}
        >
          {filtered?.map((hotel) => (
            <Marker
              key={hotel.id || hotel.userId}
              hotel={hotel}
              onClick={onMarkerClick}
              highlight={hotel.id.toString() === highlightedMarkerId}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  )
}
