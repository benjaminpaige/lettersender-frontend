import { Divider, Flex, SlideFade, Stack, Box } from "@chakra-ui/react"
import Link from "next/link"
import {
  FaRegChartBar,
  FaRegPaperPlane,
  FaRegQuestionCircle,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa"
import { BsLayoutTextWindowReverse } from "react-icons/bs"
import { NavLink } from "./NavLink"
import { Logo } from "../Logo"
import { SideBarIcon } from "./SideBarIcon"

interface SideBarProps {
  sideBarCollapsed: boolean
  toggleSideBar: () => void
}

export default function SideBar({
  toggleSideBar,
  sideBarCollapsed
}: SideBarProps) {
  return (
    <>
      <SlideFade reverse in={sideBarCollapsed}>
        <SideBarIcon
          sideBarCollapsed={sideBarCollapsed}
          toggleSideBar={toggleSideBar}
        />
      </SlideFade>
      <Box display={sideBarCollapsed ? "none" : "inherit"}>
        <SlideFade reverse in={!sideBarCollapsed}>
          <SideBarIcon
            sideBarCollapsed={sideBarCollapsed}
            toggleSideBar={toggleSideBar}
          />
        </SlideFade>
        <Flex
          display={sideBarCollapsed ? "none" : "inherit"}
          w={240}
          h="100vh"
          direction="column"
          borderRightWidth="1px"
          px={6}
          py={8}
          transition={"1s"}
        >
          <Link href="/dashboard">
            <Box style={{ cursor: "pointer" }} mb={8}>
              <Logo />
            </Box>
          </Link>
          <Stack spacing={6}>
            <Stack>
              <NavLink
                label="Dashboard"
                icon={BsLayoutTextWindowReverse}
                href="/dashboard"
              />
              <NavLink
                label="Messages"
                icon={FaRegPaperPlane}
                href="/dashboard/messages"
              />
              <NavLink
                label="Orders"
                icon={FaRegChartBar}
                href="/dashboard/orders"
              />
              <NavLink
                label="Account"
                icon={FaUser}
                href="/dashboard/account"
              />
            </Stack>
            <Divider />
            <Stack>
              <NavLink
                label="Help Center"
                icon={FaRegQuestionCircle}
                href="/dashboard/help"
              />
              <NavLink label="Log Out" icon={FaSignOutAlt} />
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </>
  )
}
