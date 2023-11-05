import React, { useEffect, useRef } from "react"

import { Marker, Popup } from "react-leaflet"
import { DivIcon, Marker as LeafletMarker } from "leaflet"

import dayjs from "dayjs"

import TripPolyline from "./TripPolyline"

import shipIcon from "../images/ship_icon.png"
import { VehiclePosition } from "../__generated__/graphql"
import RelativeTime from "./RelativeTime"
import { useMatch, useNavigate } from "react-router-dom"
import { Typography } from "@mui/material"

const getIconRotation = (shipDirection: number) => Math.round((shipDirection - 180) % 360)

const createIcon = (shipDirection: number) => {
  return new DivIcon({
    iconSize: [32, 32],
    className: "",
    html: `<img style="transform: rotate(${getIconRotation(shipDirection)}deg);" height="32" width="32" src="${shipIcon}">`
  })
}

const VehicleMarker = (props: { vehiclePosition: VehiclePosition }) => {
  const vehiclePosition = props.vehiclePosition

  const navigate = useNavigate()

  const markerRef = useRef<LeafletMarker>(null)

  const pathMatch = useMatch("/trips/:tripId/:tripDate")

  const markerOpen = pathMatch?.params.tripId === vehiclePosition.trip.tripId && pathMatch.params.tripDate === vehiclePosition.trip.date

  useEffect(() => {
    if (markerRef.current && !markerRef.current.isPopupOpen() && markerOpen) {
      markerRef.current.openPopup()
    }
  }, [markerOpen])

  if (!vehiclePosition.currentStop) {
    return null
  }

  return <>
    { markerOpen && <TripPolyline tripId={vehiclePosition.trip.tripId} date={vehiclePosition.trip.date} /> }
    <Marker
      position={[vehiclePosition.latitude, vehiclePosition.longitude]}
      icon={createIcon(vehiclePosition.bearing || 0.0)}
      eventHandlers={{
        popupclose: () => {
          //If marker ref is null, the map hasn't loaded yet and we should ignore this event, because we don't want to close the popup which was opened programmatcally 
          if (markerRef.current && markerOpen) {
            navigate("/")
          }
        },
        popupopen: () => {
          if (!markerOpen) {
            navigate(`/trips/${vehiclePosition.trip.tripId}/${vehiclePosition.trip.date}`)
          }
        }
      }}
      ref={markerRef}>
      <Popup keepInView={false} autoPan={false} minWidth={170}>
          <Typography variant="subtitle2" component="span">{ vehiclePosition.vehicleLabel || vehiclePosition.vehicleId }</Typography>
          <br />
          <Typography variant="caption" component="span">
            Speed: <i>{ ((vehiclePosition.speed || 0.0) * 3.6).toFixed(1) + " km/h" }</i>
          </Typography>
          <br />
          <Typography variant="caption" component="span">
            Updated: <i>{ vehiclePosition.timestamp && <RelativeTime timestamp={dayjs(vehiclePosition.timestamp)} /> }</i>
          </Typography>
      </Popup>
    </Marker>
  </>
}

export default VehicleMarker