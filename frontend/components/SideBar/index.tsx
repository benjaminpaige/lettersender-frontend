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
import { useRouter } from "next/router"

interface SideBarProps {
  sideBarCollapsed: boolean
  toggleSideBar: () => void
}

export default function SideBar({
  toggleSideBar,
  sideBarCollapsed
}: SideBarProps) {
  const router = useRouter()
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
                isActive={router.pathname === "/dashboard"}
                label="Dashboard"
                icon={BsLayoutTextWindowReverse}
                href="/dashboard"
              />
              <NavLink
                isActive={router.pathname.startsWith("/dashboard/messages")}
                label="Messages"
                icon={FaRegPaperPlane}
                href="/dashboard/messages"
              />
              <NavLink
                isActive={router.pathname.startsWith("/dashboard/orders")}
                label="Orders"
                icon={FaRegChartBar}
                href="/dashboard/orders"
              />
              <NavLink
                isActive={router.pathname.startsWith("/dashboard/account")}
                label="Account"
                icon={FaUser}
                href="/dashboard/account"
              />
            </Stack>
            <Divider />
            <Stack>
              <NavLink
                isActive={router.pathname.startsWith("/dashboard/help")}
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
