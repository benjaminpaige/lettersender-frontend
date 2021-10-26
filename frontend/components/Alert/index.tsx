import * as Chakra from "@chakra-ui/react"
import { µAlert, µMisc } from "./types"

export const Alert: React.FC<µAlert.Props> = ({ message, status }) => {
  return (
    <Chakra.Alert status={status}>
      <Chakra.AlertIcon />
      <Chakra.AlertDescription>{message}</Chakra.AlertDescription>
      <Chakra.CloseButton position="absolute" right="8px" top="8px" />
    </Chakra.Alert>
  )
}

Alert.defaultProps = {
  message: "",
  status: µMisc.AlertStatus.ERROR
}
