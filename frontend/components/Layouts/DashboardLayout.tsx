import { useState } from "react"
import { Flex, Box } from "@chakra-ui/react"
import SideBar from "../SideBar"

const sideBarWidth = "220px"

export function DashboardLayout({ children }) {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false)
  return (
    <Flex>
      <SideBar
        sideBarCollapsed={sideBarCollapsed}
        toggleSideBar={() => setSideBarCollapsed(!sideBarCollapsed)}
      />
      <Box flex="1">{children}</Box>
    </Flex>
  )
}
