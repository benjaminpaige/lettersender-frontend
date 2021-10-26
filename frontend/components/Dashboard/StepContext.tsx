import * as React from "react"
import { µStep } from "./types"

export const StepContext = React.createContext<µStep.Context>(
  {} as µStep.Context
)
