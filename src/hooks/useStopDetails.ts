import { useQuery } from "@apollo/client"

import { gql } from "../__generated__";

const STOP_DETAILS_QUERY = gql(`
    query StopScheduleRows($stopId: String!, $maxRows: Int!) {
        stop(id: $stopId) {
            name
            timezone
            scheduleRows(max: $maxRows, includeLastStop: false) {
                trip {
                    tripId
                    date
                    headsign
                    route {
                        agency {
                            timezone
                        }
                    }
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

const useStopDetails = (stopId: string, maxRows: number) => {
    return useQuery(STOP_DETAILS_QUERY, {
        variables: {
            stopId: stopId,
            maxRows: maxRows
        },
        fetchPolicy: "no-cache" 
    })
}

export default useStopDetails