import { useBreakpointValue, useDisclosure } from "@chakra-ui/react"
import { useEffect } from "react"

export const useMobileMenuState = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  useEffect(() => {
    if (isMobile == false) {
      onClose()
    }
  }, [isMobile, onClose])

  return { isOpen, onClose, onOpen }
}
