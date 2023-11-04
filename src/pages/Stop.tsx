import { useNavigate, useParams } from "react-router-dom"

import { Box, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material"
import ListItemButton from '@mui/material/ListItemButton';

import { StopScheduleRow } from "../__generated__/graphql"


import { formatTime } from "../utils/timeFormat"

import useStopDetails from "../hooks/useStopDetails"

const StopScheduleRows = (props: { scheduleRows: StopScheduleRow[] }) => {
  const navigate = useNavigate()

  return <List>
    {
      props.scheduleRows.map((scheduleRow: StopScheduleRow) => {
        const headsign = scheduleRow.headsign || scheduleRow.trip.headsign

        const timezone = scheduleRow.trip.route.agency?.timezone || "Europe/Helsinki"

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

  return <>
    <Typography variant="h5" component="h2" sx={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden'  }}>
      { data.stop.name }
    </Typography>
    <StopScheduleRows scheduleRows={data.stop.scheduleRows as StopScheduleRow[]} />
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