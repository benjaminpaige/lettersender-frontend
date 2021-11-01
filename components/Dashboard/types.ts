import { BoxProps } from "@chakra-ui/react"

export namespace µStep {
  export interface Props extends BoxProps {
    title?: string
  }

  export interface Context {
    step: number
    isActive: boolean
    isCompleted: boolean
    isLastStep: boolean
  }
}

export namespace µSteps {
  export interface HookOptions {
    initialStep: number
  }

  export interface Props {
    activeStep: number
  }
}

export namespace µStepContent {
  export interface Props extends BoxProps {}
}
