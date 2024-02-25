import { createContext } from "react"
import { Stop } from "../__generated__/graphql"

const StopContext = createContext<Stop[]>([])

export default StopContext