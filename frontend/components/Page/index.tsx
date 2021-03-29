import SideBar from "../SideBar"
import { Flex, Box } from "@chakra-ui/react"

export default function Page({ children }) {
  return (
    <Flex>
      <SideBar />
      <Box m={8} flex="1">
        {children}
      </Box>
    </Flex>
  )
}
