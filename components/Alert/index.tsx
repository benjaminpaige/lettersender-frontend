import * as Chakra from "@chakra-ui/react"
import { useState } from "react"
import { µAlert, µMisc } from "./types"

export const Alert: React.FC<µAlert.Props> = ({ message, status, ...alertProps }) => {
  const [closed, setClosed] = useState(false)
  if (closed) return null

  return (
    <Chakra.Alert status={status} {...alertProps}>
      <Chakra.AlertIcon />
      <Chakra.AlertDescription>{message}</Chakra.AlertDescription>
      <Chakra.CloseButton position="absolute" right="8px" top="8px" onClick={() => setClosed(true)}/>
    </Chakra.Alert>
  )
}

Alert.defaultProps = {
  message: "",
  status: µMisc.AlertStatus.ERROR
}
