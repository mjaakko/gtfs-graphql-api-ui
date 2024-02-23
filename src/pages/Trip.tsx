import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator, timelineItemClasses } from "@mui/lab"
import { deepOrange } from "@mui/material/colors"
import { Box, CircularProgress, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { TripScheduleRow } from "../__generated__/graphql"

import useTripDetails from "../hooks/useTripDetails"

import { formatDateTime } from "../utils/timeFormat"

import VehiclePositionContext from "../context/vehiclePositionContext"

const TripScheduleRows = (props: { scheduleRows: TripScheduleRow[], agencyTimezone: string, vehicleId: string | null }) => {
    const agencyTimezone = props.agencyTimezone

    const vehiclePositions = useContext(VehiclePositionContext)
    const vehiclePosition = vehiclePositions.find(vehiclePosition => vehiclePosition.vehicleId === props.vehicleId)

    const inTransitToSequence = vehiclePosition?.status === "IN_TRANSIT_TO" ? vehiclePosition.currentStop?.sequenceNumber : null
    const stoppedAtSequence = vehiclePosition?.status === "STOPPED_AT" ? vehiclePosition.currentStop?.sequenceNumber : null

    const inViewIndex = props.scheduleRows
      .findIndex((scheduleRow: TripScheduleRow, index: number) => {
        const nextScheduleRow = props.scheduleRows[index + 1]
        return stoppedAtSequence === scheduleRow.sequenceNumber ||
          (nextScheduleRow != null && inTransitToSequence === nextScheduleRow.sequenceNumber)
      })

    const ref = useRef<HTMLDivElement>()
  
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
      if (!scrolled) {
        const element = ref?.current
        if (element) {
          element.scrollIntoView()
          setScrolled(true)
        }
      }
    }, [scrolled, inViewIndex])

    return <Timeline
      position="right"
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
        height: 'fit-content'
      }}>
        {props.scheduleRows.map((scheduleRow: TripScheduleRow, index: number) => {
          const stopTimezone = scheduleRow.stop.timezone

          const isFirst = index === 0
          const isLast = index === props.scheduleRows.length - 1

          const color = deepOrange[500]

          return <TimelineItem key={scheduleRow.sequenceNumber} ref={index === inViewIndex ? ref : undefined}>
            <TimelineSeparator>
              { stoppedAtSequence === scheduleRow.sequenceNumber ?
                <TimelineDot sx={{ backgroundColor: color }} /> :
                <TimelineDot /> 
              }
              { !isLast && (inTransitToSequence === scheduleRow.sequenceNumber + 1 ?
                <TimelineConnector sx={{ backgroundColor: color }} /> :
                <TimelineConnector />)
              }
            </TimelineSeparator>
            <TimelineContent sx={{ height: '100px', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              <Typography component="div" sx={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                { scheduleRow.stop.name }
              </Typography>
              { !isFirst && 
                <Typography component="div" color="textSecondary" sx={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  Arrival: { formatDateTime(scheduleRow.arrivalTimeScheduled, stopTimezone ?? agencyTimezone) }
                </Typography>
              }
              { !isLast &&
                <Typography component="div" color="textSecondary" sx={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  Departure: { formatDateTime(scheduleRow.departureTimeScheduled, stopTimezone ?? agencyTimezone) }
                </Typography>
              }
            </TimelineContent>
          </TimelineItem>
      })}
    </Timeline>
}

const TripDetails = (props: { tripId: string, date: string }) => {
  const theme = useTheme()

  const tripDetails = useTripDetails(props.tripId, props.date)

  if (tripDetails.loading) {
    return <Box sx={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
  }

  if (!tripDetails.data || !tripDetails.data.trip) {
    return null
  }

  const route = tripDetails.data.trip.route

  if (!route) {
    return null
  }

  const agencyTimezone = route.agency!.timezone

  const vehicleId = tripDetails.data.trip.vehiclePosition?.vehicleId || null

  return <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
    <Box component="header" sx={{ flexShrink: 0, flexGrow: 0, backgroundColor: theme.palette.background.default, zIndex: 2 }}>
      <Typography variant="h5" component="h2" sx={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden' }}>
        { route.shortName ? route.shortName : route.longName }
      </Typography>
      { tripDetails.data.trip.vehiclePosition?.vehicleLabel &&
        <Typography variant="caption" component="span" sx={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden'  }} gutterBottom>
          { tripDetails.data.trip.vehiclePosition.vehicleLabel }
        </Typography>
      }
    </Box>
    <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
      <TripScheduleRows scheduleRows={tripDetails.data.trip.scheduleRows as TripScheduleRow[]} agencyTimezone={agencyTimezone} vehicleId={vehicleId}/>
    </Box>
  </Box>
}


const Trip = () => {
    const { tripId, tripDate } = useParams()

    if (!tripId || !tripDate) {
      return null
    }

    return <TripDetails tripId={tripId} date={tripDate} />
}

export default Trip