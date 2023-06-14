/* eslint-disable @typescript-eslint/no-explicit-any */
// UI to show a map with a user location on real time with socket io.
// Put a marker on the map with the user location. The marker must be updated in real time.
// package google-map-react
import React from 'react'
import GoogleMapReact from 'google-map-react'
import { PinMap } from '../icons/pin-map-icon'
const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

const PinComponent: any = () => (
  <PinMap color={'#ed2524'} width={23} height={23} />
)

type Props = {
  lat: number
  lng: number
}

export default function TrackMap({ lat, lng }: Props) {
  console.log('============== TrackMap ==============')
  console.log(lat, lng)
  console.log('============== TrackMap ==============')
  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 15,
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key }}
        center={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <PinComponent lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  )
}
