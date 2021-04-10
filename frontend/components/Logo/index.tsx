import { Box, Heading, WrapItem, Wrap } from "@chakra-ui/react"
import { FaFire } from "react-icons/fa"
import { IconContext } from "react-icons"

export const Logo = () => {
  return (
    <WrapItem>
      <IconContext.Provider value={{ color: "red" }}>
        <FaFire size="24px" />
      </IconContext.Provider>
      <Heading ml="2" mt="2px" size="md">
        Fire Mail
      </Heading>
    </WrapItem>
  )
}

export default Logo
