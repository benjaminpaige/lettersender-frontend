import SideBar from "../SideBar"
import { Flex, Box } from "@chakra-ui/react"

export default function Page({ children }) {
  return (
    <Flex>
      <SideBar />
      <Box flex="1">{children}</Box>
    </Flex>
  )
}
