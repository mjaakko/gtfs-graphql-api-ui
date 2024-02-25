import { useEffect, useRef, useState } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import { Marker as LeafletMarker } from "leaflet"

import { Stop } from "../__generated__/graphql"

import { useNavigate, useMatch } from "react-router-dom"
import { Typography } from "@mui/material"

const StopMarker = (props: { stop: Stop }) => {
    const stop = props.stop

    const navigate = useNavigate()

    const markerRef = useRef<LeafletMarker>(null)

    const map = useMap()

    const pathMatch = useMatch("/stops/:stopId")

    const markerOpen = pathMatch?.params.stopId === stop.stopId

    useEffect(() => {
      if (markerRef.current && !markerRef.current.isPopupOpen() && markerOpen) {
        markerRef.current.openPopup()
      
        map.setView(markerRef.current.getLatLng())
      }
    }, [markerOpen, map])

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
              map.setView([stop.latitude!, stop.longitude!])
            }
          }
        }}
        ref={markerRef}>
        <Popup 
          keepInView={false}
          autoPan={false} 
          minWidth={200}>
          <Typography variant="subtitle2" component="span">{ stop.name }</Typography>
        </Popup>
      </Marker>
    )
  }
  
export default StopMarker