import React, { useContext, useEffect, useState } from "react"
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet"
import { LatLngBounds, LatLngTuple, Map as LeafletMap } from "leaflet"

import useStops from "../hooks/useStops"

import { Stop, VehiclePosition } from "../__generated__/graphql"

import VehicleMarker from "./VehicleMarker"
import StopMarker from "./StopMarker"
import VehiclePositionContext from "../context/vehiclePositionContext"

const Vehicles = () => {
  const vehiclePositions = useContext(VehiclePositionContext)

  return vehiclePositions.map((vehiclePosition: VehiclePosition) => (
    <VehicleMarker key={vehiclePosition.vehicleId} vehiclePosition={vehiclePosition} />
  ))
}

const Stops = () => {
  const { data } = useStops()

  const [mapMovedByUser, setMapMovedByUser] = useState(false)
  const map = useMap()

  useMapEvent('move', () => setMapMovedByUser(true))

  useEffect(
    () => {
      //If the user hasn't moved the map yet, move it so that it contains all stops
      if (map && !mapMovedByUser && data?.stops) {
        const coords = data?.stops
          .filter((stop) => stop.latitude && stop.longitude)
          .map((stop) => [stop.latitude!, stop.longitude!] as LatLngTuple)
        const bounds = new LatLngBounds(coords)

        map.fitBounds(bounds)
      }
    },
    [map, data?.stops, mapMovedByUser]
  )

  return (data?.stops as Stop[]|| []).map((stop: Stop) => 
    <StopMarker key={stop.stopId} stop={stop}/>
  )
}

const Map = React.forwardRef((_, ref: React.Ref<LeafletMap>) => {
  return (
    <MapContainer
        center={[59.711, 21.747]}
        zoom={8}
        style={{ height: '100%', flexGrow: '1' }}
        ref={ref}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Stops />
        <Vehicles />
    </MapContainer>
  )
})

export default Map