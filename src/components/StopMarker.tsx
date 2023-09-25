import React, { useState } from "react"
import { Marker, Popup } from "react-leaflet"

import { Stop } from "../__generated__/graphql"

import StopScheduleRows from "./StopScheduleRows"

const StopMarker = (props: { stop: Stop }) => {
    const [showScheduleRow, setShowScheduleRows] = useState(false)
  
    const stop = props.stop
    if (!stop.latitude || !stop.longitude) {
      //Can't create markers for stops without location
      return null
    }
  
    return (
      <Marker
        position={[stop.latitude, stop.longitude]}
        eventHandlers={{
          popupclose: () => setShowScheduleRows(false),
          popupopen: () => setShowScheduleRows(true)
        }}>
        <Popup minWidth={200}>
          <b>{ stop.name }</b>
          { showScheduleRow && <StopScheduleRows stopId={stop.stopId} timezone={stop.timezone || undefined} />}
        </Popup>
      </Marker>
    )
  }
  
export default StopMarker