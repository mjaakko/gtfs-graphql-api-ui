import { useNavigate, useParams } from "react-router-dom"

import { Box, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material"
import ListItemButton from '@mui/material/ListItemButton';

import { StopScheduleRow } from "../__generated__/graphql"


import { formatTime } from "../utils/timeFormat"

import useStopDetails from "../hooks/useStopDetails"
import DocumentTitle from "../components/DocumentTitle";

const StopScheduleRows = (props: { scheduleRows: StopScheduleRow[], stopTimezone: string | null }) => {
  const navigate = useNavigate()

  return <List>
    {
      props.scheduleRows.map((scheduleRow: StopScheduleRow) => {
        const headsign = scheduleRow.headsign || scheduleRow.trip.headsign

        const timezone = props.stopTimezone || scheduleRow.trip.route.agency?.timezone || "Europe/Helsinki"

        return <ListItem key={`/${scheduleRow.trip.tripId}_${scheduleRow.trip.date}`} disablePadding>
          <ListItemButton onClick={() => navigate(`/trips/${scheduleRow.trip.tripId}/${scheduleRow.trip.date}`)}>
            <ListItemText primary={headsign} secondary={formatTime(scheduleRow.departureTimeScheduled, timezone)} />
          </ListItemButton>
      </ListItem>
      })
    }
  </List>
}

const StopDetails = (props: { stopId: string }) => {
  const { loading, data } = useStopDetails(props.stopId, 5)

  if (loading) {
    return <Box sx={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
  }

  if (!data || !data.stop) {
    return null
  }

  const title = data.stop.name ?? null

  return <>
    <DocumentTitle title={title} />
    <Typography variant="h5" component="h2" sx={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden'  }}>
      { title }
    </Typography>
    <StopScheduleRows scheduleRows={data.stop.scheduleRows as StopScheduleRow[]} stopTimezone={data.stop.timezone ?? null} />
  </>
}


const Stop = () => {
    const { stopId } = useParams()

    if (!stopId) {
      return null
    }

    return <StopDetails stopId={stopId} />
}

export default Stop