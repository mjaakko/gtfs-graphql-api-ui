import { useQuery } from "@apollo/client"

import { gql } from "../__generated__";

const TRIP_DETAILS_QUERY = gql(`
    query TripScheduleRows($tripId: String!, $date: Date!) {
        trip(id: $tripId, date: $date) {
            route {
              agency {
                timezone
              }
              shortName
              longName
            }
            scheduleRows {
              sequenceNumber
              stop {
                name
                timezone
              }
              arrivalTimeScheduled
              departureTimeScheduled
            }
            vehiclePosition {
              vehicleId
              vehicleLabel
            }
        }
    }
`);

const useTripDetails = (tripId: string, date: string) => {
    return useQuery(TRIP_DETAILS_QUERY, {
        variables: {
            tripId: tripId,
            date: date
        },
        fetchPolicy: "no-cache" 
    })
}

export default useTripDetails