import { Heading, WrapItem, useColorModeValue as mode } from "@chakra-ui/react"
import { RiMailSendLine } from "react-icons/ri"
import { IconContext } from "react-icons"
import { APP_NAME } from "../../config"

export const Logo = () => {
  return (
    <WrapItem>
      <IconContext.Provider value={{ color: mode("blue.600", "blue.200") }}>
        <RiMailSendLine size="24px" />
      </IconContext.Provider>
      <Heading ml="2" size="md">
        {APP_NAME}
      </Heading>
    </WrapItem>
  )
}

export default Logo
