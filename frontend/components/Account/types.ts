import { ChangeEvent } from "react"
import { BoxProps, StackProps } from "@chakra-ui/react"
import { UseUserReturn } from "@/hooks"

export namespace µMisc {
  export interface AccountUser {
    id: string
    firstName: string
    lastName: string
    email: string
    dateJoined: string
    darkMode: boolean
    allowMarketingTips: boolean
    allowMarketingUpdates: boolean
  }
}
export namespace µAccountSettings {
  export type HandleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => void

  export interface Props {
    user: µMisc.AccountUser
    updateUser: UseUserReturn["updateUser"]
  }
}

export namespace µCard {
  export interface Props extends BoxProps {}
}

export namespace µDangerZone {
  export interface Props extends StackProps {}
}

export namespace µFieldGroup {
  export interface Props extends BoxProps {
    title: string
    description: string
  }
}

export namespace µHeadingGroup {
  export interface Props extends StackProps {
    title: string
    description: string
  }
}
