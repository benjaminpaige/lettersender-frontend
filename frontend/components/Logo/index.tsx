import { Box, Heading, WrapItem, Wrap } from "@chakra-ui/react"
import { FaFire } from "react-icons/fa"
import { IconContext } from "react-icons"

export const Logo = () => {
  return (
    <Box mb={8}>
      <Wrap>
        <WrapItem>
          <IconContext.Provider value={{ color: "red" }}>
            <div>
              <FaFire size="24px" />
            </div>
          </IconContext.Provider>
          <Heading ml="8px" mt="2px" size="md">
            Fire Mail
          </Heading>
        </WrapItem>
      </Wrap>
    </Box>
  )
}
