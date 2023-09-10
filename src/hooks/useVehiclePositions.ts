import { useSubscription } from "@apollo/client";

import { gql } from "../__generated__/gql";

const VEHICLE_POSITIONS_SUBSCRIPTION = gql(`
  subscription VehiclePositions {
    vehiclePositions {
        vehicleId
        vehicleLabel
        currentStop {
            arrivalTimeScheduled
            departureTimeScheduled
            headsign
            stop {
                name
                timezone
            }
        }
        trip {
            tripId
            date
            route {
                longName
                agency {
                    timezone
                }
            }
            headsign
        }
        latitude
        longitude
        bearing
        speed
        status
        timestamp
    }
  }
`);


const useVehiclePositions = () => {
    return useSubscription(VEHICLE_POSITIONS_SUBSCRIPTION)
}

export default useVehiclePositions