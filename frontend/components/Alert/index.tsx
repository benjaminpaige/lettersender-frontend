import * as Chakra from '@chakra-ui/react'

interface AlertProps {
    message: string
    status?: "error" | "info" | "warning" | "success"
}

export const Alert = ({message, status = "error"}: AlertProps) => {
    return  (
        <Chakra.Alert status={status}>
            <Chakra.AlertIcon />
            <Chakra.AlertDescription>{message}</Chakra.AlertDescription>
            <Chakra.CloseButton position="absolute" right="8px" top="8px" />
        </Chakra.Alert>
    )
}