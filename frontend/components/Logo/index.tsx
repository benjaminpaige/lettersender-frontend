import { Heading, WrapItem, useColorModeValue as mode } from "@chakra-ui/react"
import { FaFire } from "react-icons/fa"
import { GiSnail } from "react-icons/gi"
import { IconContext } from "react-icons"

export const Logo = () => {
  return (
    <WrapItem>
      <IconContext.Provider value={{ color: mode("blue.600", "blue.200") }}>
        <GiSnail size="24px" />
      </IconContext.Provider>
      <Heading ml="2" mt="2px" size="md">
        Snail Sender
      </Heading>
    </WrapItem>
  )
}

export default Logo
