import { useState } from "react"
import { µUseAccountForm } from "./types"

export const useAccountForm = (
  params: µUseAccountForm.Params
): µUseAccountForm.Return => {
  const [fullName, setFullName] = useState(params?.fullName)
  const [email, setEmail] = useState(params?.email)
  const [allowMarketingTips, setAllowMarketingTips] = useState(
    params?.allowMarketingTips
  )
  const [allowMarketingUpdates, setAllowMarketingUpdates] = useState(
    params?.allowMarketingUpdates
  )

  return {
    state: {
      fullName,
      email,
      allowMarketingTips,
      allowMarketingUpdates,
      isChanged:
        fullName?.trim() !== params?.fullName ||
        allowMarketingTips !== params?.allowMarketingTips ||
        allowMarketingUpdates !== params?.allowMarketingUpdates
    },
    methods: {
      setFullName,
      setEmail,
      setAllowMarketingTips,
      setAllowMarketingUpdates
    }
  }
}
