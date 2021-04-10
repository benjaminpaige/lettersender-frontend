import { useRouter } from "next/router"
import SideBar from "../SideBar"
import { Flex, Box } from "@chakra-ui/react"

export default function Page({ children }) {
  const router = useRouter()
  return (
    <Flex>
      {router.pathname !== "/" && <SideBar />}
      <Box flex="1">{children}</Box>
    </Flex>
  )
}
