import { useState } from "react"
import { Flex, Box } from "@chakra-ui/react"
import { SideBar } from "../SideBar"
import { MobileTopBar } from "@/components/MobileTopBar"

const sideBarWidth = "220px"

export function DashboardLayout({ children }) {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false)
  return (
    <Flex h="100vh" flexDirection={{ base: "column", md: "row" }}>
      <MobileTopBar />
      <Box display={{ base: "none", md: "flex" }}>
        <SideBar />
      </Box>
      <Box flex="1">{children}</Box>
    </Flex>
  )
}
