import {
  Divider,
  Flex,
  Spacer,
  Stack,
  Box,
  Heading,
  WrapItem,
  Wrap
} from "@chakra-ui/react"
import Link from "next/link"
import {
  FaRegBell,
  FaRegChartBar,
  FaRegHeart,
  FaRegPaperPlane,
  FaRegQuestionCircle,
  FaUser,
  FaFire
} from "react-icons/fa"
import { NavLink } from "./NavLink"
import { UserProfile } from "./UserProfile"
import { IconContext } from "react-icons"

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
      </Link>
      <Stack spacing={6}>
        <Stack>
          <NavLink label="People" icon={FaUser} />
          <NavLink label="Favorites" icon={FaRegHeart} />
          <NavLink label="Messages" icon={FaRegPaperPlane} href="/messages" />
          <NavLink
            label="Add Message"
            icon={FaRegPaperPlane}
            href="add-message"
          />
          <NavLink label="Send Mail" icon={FaRegPaperPlane} />
          <NavLink label="Orders" icon={FaRegChartBar} />
        </Stack>
        <Divider />
        <Stack>
          <NavLink label="Settings" icon={FaRegBell} />
          <NavLink label="Help Center" icon={FaRegQuestionCircle} />
        </Stack>
        <Divider />
        <Stack>
          <NavLink label="Log Out" icon={FaRegBell} />
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
