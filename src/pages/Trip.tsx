import { useParams } from "react-router-dom"

import { Box, CircularProgress, Typography } from "@mui/material"
import useTripDetails from "../hooks/useTripDetails"

import { formatDateTime } from "../utils/timeFormat"
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator, timelineItemClasses } from "@mui/lab"

const TripScheduleRows = (props: { scheduleRows: any, agencyTimezone: string }) => {
    const agencyTimezone = props.agencyTimezone

    return <Timeline
      position="right"
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}>
        {props.scheduleRows.map((scheduleRow: any, index: number) => {
          const stopTimezone = scheduleRow.stop.timezone

          const isFirst = index === 0
          const isLast = index === props.scheduleRows.length - 1

          return <TimelineItem key={scheduleRow.sequenceNumber}>
            <TimelineSeparator>
              <TimelineDot />
              { !isLast && <TimelineConnector /> }
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

  return <>
    <Typography variant="h5" component="h2" sx={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden'  }}>
      { route.shortName ? route.shortName : route.longName }
    </Typography>
    { tripDetails.data.trip.vehiclePosition?.vehicleLabel &&
      <Typography variant="caption" component="span" sx={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden'  }} gutterBottom>
        { tripDetails.data.trip.vehiclePosition.vehicleLabel }
      </Typography>
    }
    <TripScheduleRows scheduleRows={tripDetails.data.trip.scheduleRows} agencyTimezone={agencyTimezone} />
  </>
}


const Trip = () => {
    const { tripId, tripDate } = useParams()

    if (!tripId || !tripDate) {
      return null
    }

    return <TripDetails tripId={tripId} date={tripDate} />
}

export default Trip