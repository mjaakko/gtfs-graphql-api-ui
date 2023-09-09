import { useQuery } from "@apollo/client";

import { gql } from "../__generated__/gql";

const TRIP_POLYLINE_QUERY = gql(`
  query TripPolyline($tripId: String!, $date: Date!) {
    trip(id: $tripId, date: $date) {
      shape
    }
  }
`);


const useTripPolyline = (tripId: string, date: string) => {
  return useQuery(TRIP_POLYLINE_QUERY, {
    variables: {
      tripId,
      date
    }
  })
}

export default useTripPolyline