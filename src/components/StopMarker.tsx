import React, { useEffect, useRef, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import { Marker as LeafletMarker } from "leaflet"

import { Stop } from "../__generated__/graphql"

import { useNavigate, useMatch } from "react-router-dom"
import { Typography } from "@mui/material"

const StopMarker = (props: { stop: Stop }) => {
    const [showScheduleRow, setShowScheduleRows] = useState(false)
  
    const stop = props.stop

    const navigate = useNavigate()

    const markerRef = useRef<LeafletMarker>(null)

    const pathMatch = useMatch("/stops/:stopId")

    const markerOpen = pathMatch?.params.stopId === stop.stopId

    useEffect(() => {
      if (markerRef.current && !markerRef.current.isPopupOpen() && markerOpen) {
        markerRef.current.openPopup()
      }
    }, [markerOpen])

    if (!stop.latitude || !stop.longitude) {
      //Can't create markers for stops without location
      return null
    }
  
    return (
      <Marker
        position={[stop.latitude, stop.longitude]}
        eventHandlers={{
          popupclose: () => {
            //If marker ref is null, the map hasn't loaded yet and we should ignore this event, because we don't want to close the popup which was opened programmatcally 
            if (markerRef.current && markerOpen) {
              navigate("/")
            }
          },
          popupopen: () => {
            if (!markerOpen) {
              navigate(`/stops/${stop.stopId}`)
            }
          }
        }}
        ref={markerRef}>
        <Popup minWidth={200}>
          <Typography variant="subtitle2" component="span">{ stop.name }</Typography>
        </Popup>
      </Marker>
    )
  }
  
export default StopMarker