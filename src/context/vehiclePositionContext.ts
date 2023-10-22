import { createContext } from "react"
import { VehiclePosition } from "../__generated__/graphql"

const VehiclePositionContext = createContext<VehiclePosition[]>([])

export default VehiclePositionContext