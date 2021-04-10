import { Divider, Flex, Spacer, Stack, Box } from "@chakra-ui/react"
import Link from "next/link"
import {
  FaRegChartBar,
  FaRegPaperPlane,
  FaRegQuestionCircle,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa"
import { NavLink } from "./NavLink"
import { UserProfile } from "./UserProfile"
import { Logo } from "../Logo"

export default function SideBar() {
  return (
    <Flex
      height="100vh"
      direction="column"
      borderRightWidth="1px"
      px={6}
      py={8}
    >
      <Link href="/">
        <Box style={{ cursor: "pointer" }} mb={8}>
          <Logo />
        </Box>
      </Link>
      <Stack spacing={6}>
        <Stack>
          <NavLink label="Messages" icon={FaRegPaperPlane} href="/messages" />
          <NavLink label="Orders" icon={FaRegChartBar} href="/orders" />
          <NavLink label="Account" icon={FaUser} href="/account" />
          <NavLink
            label="Help Center"
            icon={FaRegQuestionCircle}
            href="/help"
          />
        </Stack>
        <Divider />
        <Stack>
          <NavLink label="Log Out" icon={FaSignOutAlt} />
        </Stack>
      </Stack>
      <Spacer />
      <UserProfile
        name="Benjamin Paige"
        image="https://images.unsplash.com/photo-1521296797187-726205347ca9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjR8fGxhZHklMjBzbWlsaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        email="benjamin.paige@gmail.com"
      />
    </Flex>
  )
}
