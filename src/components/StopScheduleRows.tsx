import React from "react"

import { CircularProgress } from "@mui/material"

import { StopScheduleRow } from "../__generated__/graphql"

import useStopDetails from "../hooks/useStopDetails"

import { formatTime } from "../utils/timeFormat"


const StopScheduleRows = (props: { stopId: string, timezone?: string }) => {
    const { loading, data } = useStopDetails(props.stopId, 4)
  
    if (loading) {
      return <CircularProgress sx={{ m: 2 }}/>
    }
    
    if (data) {
      return <ul>
        { 
          (data.stop?.scheduleRows as StopScheduleRow[]).map((scheduleRow: StopScheduleRow) => {
            const headsign = scheduleRow.headsign || scheduleRow.trip.headsign
  
            const timezone = props.timezone || scheduleRow.trip.route.agency?.timezone || "Europe/Helsinki"

            return (
              <li key={`${scheduleRow.trip.tripId}_${scheduleRow.trip.date}`}>
                { formatTime(scheduleRow.departureTimeScheduled, timezone) } - <i>{ headsign }</i>
              </li>
            )
          })
        }
      </ul>
    }
  
    return null
  }

export default StopScheduleRows