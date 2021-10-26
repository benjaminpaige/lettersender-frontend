import { useState } from "react"
import { µSteps } from "./types"

export const useSteps = ({ initialStep }: µSteps.HookOptions) => {
  const [activeStep, setActiveStep] = useState(initialStep)

  const nextStep = () => setActiveStep((state) => state + 1)
  const prevStep = () => setActiveStep((state) => state - 1)
  const reset = () => setActiveStep(0)

  return { nextStep, prevStep, reset, activeStep }
}
