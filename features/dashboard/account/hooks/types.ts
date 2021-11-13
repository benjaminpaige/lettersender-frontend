import { Dispatch, SetStateAction } from "react"

export namespace µUseAccountForm {
  export interface State {
    fullName: string
    email: string
    allowMarketingTips: boolean
    allowMarketingUpdates: boolean
    isChanged: boolean
  }

  export interface Methods {
    setFullName: Dispatch<SetStateAction<string>>
    setEmail: Dispatch<SetStateAction<string>>
    setAllowMarketingTips: Dispatch<SetStateAction<boolean>>
    setAllowMarketingUpdates: Dispatch<SetStateAction<boolean>>
  }

  export interface Params {
    fullName?: State["fullName"]
    email?: State["email"]
    allowMarketingTips?: State["allowMarketingTips"]
    allowMarketingUpdates?: State["allowMarketingUpdates"]
  }

  export interface Return {
    state: State
    methods: Methods
  }
}
