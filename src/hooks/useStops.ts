import { useQuery } from "@apollo/client";

import { gql } from "../__generated__/gql";

const STOPS_QUERY = gql(`
  query Stops {
    stops {
        stopId
        name
        latitude
        longitude
        timezone
    }
  }
`);


const useStops = () => {
    return useQuery(STOPS_QUERY)
}

export default useStops