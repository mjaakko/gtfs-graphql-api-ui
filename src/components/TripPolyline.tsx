import React from "react"
import { Polyline } from "react-leaflet"
import polyline from "@mapbox/polyline"

import useTripPolyline from "../hooks/useTripPolyline"

const TripPolyline = (props: { tripId: string, date: string }) => {
    const { data } = useTripPolyline(props.tripId, props.date)
  
    if (data?.trip?.shape) {
      const points = polyline.decode(data.trip.shape)
  
      return <Polyline positions={points} pathOptions={{ weight: 4, color: 'rgb(229, 57, 53)', opacity: 0.9 }} />
    } else {
      return null
    }
  }

export default TripPolyline