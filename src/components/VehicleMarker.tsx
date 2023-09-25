import React, { useState } from "react"

import { Marker, Popup } from "react-leaflet"
import { DivIcon } from "leaflet"

import dayjs from "dayjs"

import { formatTime } from "../utils/timeFormat"
import TripPolyline from "./TripPolyline"

import shipIcon from "../images/ship_icon.png"
import { VehiclePosition } from "../__generated__/graphql"
import RelativeTime from "./RelativeTime"

const getIconRotation = (shipDirection: number) => Math.round((shipDirection - 180) % 360)

const createIcon = (shipDirection: number) => {
  return new DivIcon({
    iconSize: [32, 32],
    className: "",
    html: `<img style="transform: rotate(${getIconRotation(shipDirection)}deg);" height="32" width="32" src="${shipIcon}">`
  })
}

const VehicleMarker = (props: { vehiclePosition: VehiclePosition }) => {
  const [showPolyline, setShowPolyline] = useState(false)

  const vehiclePosition = props.vehiclePosition

  if (!vehiclePosition.currentStop) {
    return null
  }

  const destination = vehiclePosition.currentStop.headsign ?
    vehiclePosition.currentStop.headsign :
    vehiclePosition.trip.headsign

  const atStop = vehiclePosition.status === "STOPPED_AT"

  const stopTimezone = vehiclePosition.currentStop.stop.timezone || vehiclePosition.trip.route.agency?.timezone || "Europe/Helsinki"

  const stopStatus = atStop ?
    <>
      Stopped at <i>{vehiclePosition.currentStop.stop.name}</i>, scheduled departure: <i>{formatTime(vehiclePosition.currentStop.departureTimeScheduled, stopTimezone)}</i>
    </> :
    <>
      In transit to <i>{vehiclePosition.currentStop.stop.name}</i>, scheduled arrival: <i>{formatTime(vehiclePosition.currentStop.arrivalTimeScheduled, stopTimezone)}</i>
    </>

  return <>
    { showPolyline && <TripPolyline tripId={vehiclePosition.trip.tripId} date={vehiclePosition.trip.date} /> }
    <Marker
      position={[vehiclePosition.latitude, vehiclePosition.longitude]}
      icon={createIcon(vehiclePosition.bearing || 0.0)}
      eventHandlers={{
        popupclose: () => setShowPolyline(false),
        popupopen: () => setShowPolyline(true)
      }}>
      <Popup keepInView={false} autoPan={false}>
          <b>{ vehiclePosition.vehicleLabel || vehiclePosition.vehicleId }</b>
          <br />
          <br />
          Destination: <i>{ destination }</i>
          <br />
          <br />
          { stopStatus }
          <br />
          <br />
          Speed: <i>{ ((vehiclePosition.speed || 0.0) * 3.6).toFixed(1) + " km/h" }</i>
          <br />
          <br />
          Updated: <i>{ vehiclePosition.timestamp && <RelativeTime timestamp={dayjs(vehiclePosition.timestamp)} /> }</i>
      </Popup>
    </Marker>
  </>
}

export default VehicleMarker