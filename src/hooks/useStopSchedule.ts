import { useQuery } from "@apollo/client"

import { gql } from "../__generated__";

const STOP_SCHEDULE_ROWS_QUERY = gql(`
    query StopScheduleRows($stopId: String!, $maxRows: Int!) {
        stop(id: $stopId) {
            scheduleRows(max: $maxRows) {
                trip {
                    tripId
                    date
                    headsign
                }
                headsign
                arrivalTimeScheduled
                departureTimeScheduled
                pickUp
                dropOff
            }
        }
    }
`);

const useStopScheduleRows = (stopId: string, maxRows: number) => {
    return useQuery(STOP_SCHEDULE_ROWS_QUERY, {
        variables: {
            stopId: stopId,
            maxRows: maxRows
        },
        fetchPolicy: "no-cache" 
    })
}

export default useStopScheduleRows