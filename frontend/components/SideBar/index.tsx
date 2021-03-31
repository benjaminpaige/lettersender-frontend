import Link from "next/link"
import { Box, Divider, Flex, Spacer, Stack } from "@chakra-ui/react"
import {
  FaRegBell,
  FaRegChartBar,
  FaRegHeart,
  FaRegPaperPlane,
  FaRegQuestionCircle,
  FaUser
} from "react-icons/fa"
import { Logo } from "./Logo"
import { NavLink } from "./NavLink"
import { UserProfile } from "./UserProfile"

export default function SideBar() {
  return (
    <Flex
      height="100vh"
      width={{ base: "full", sm: "xs" }}
      direction="column"
      borderRightWidth="1px"
      px={6}
      py={8}
    >
      <Box mb={8}>
        <Logo iconColor="blue.600" />
      </Box>
      <Stack spacing={6}>
        <Stack>
          <NavLink label="People" icon={FaUser} isActive />
          <NavLink label="Favorites" icon={FaRegHeart} />
          <Link href="/messages">
            <NavLink label="Messages" icon={FaRegPaperPlane} />
          </Link>
          <Link href="/add-message">
            <NavLink label="Add Message" icon={FaRegPaperPlane} />
          </Link>
          <NavLink label="Send Mail" icon={FaRegPaperPlane} />
          <NavLink label="Orders" icon={FaRegChartBar} />
        </Stack>
        <Divider />
        <Stack>
          <NavLink label="Settings" icon={FaRegBell} />
          <NavLink label="Help Center" icon={FaRegQuestionCircle} />
        </Stack>
      </Stack>
      <Spacer />
      <UserProfile
        name="Cindy Winston"
        image="https://images.unsplash.com/photo-1521296797187-726205347ca9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjR8fGxhZHklMjBzbWlsaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        email="cindy@example.com"
      />
    </Flex>
  )
}
