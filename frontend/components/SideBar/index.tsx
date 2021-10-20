import { Divider, Flex, SlideFade, Stack, Box } from "@chakra-ui/react"
import Link from "next/link"
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from "@/graphql"
import { useMutation } from "@apollo/client"
import {
  // FaRegChartBar,
  // FaRegPaperPlane,
  // FaRegQuestionCircle,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa"
import { BsLayoutTextWindowReverse } from "react-icons/bs"
import { NavLink } from "./NavLink"
import { Logo } from "../Logo"
import { useRouter } from "next/router"

interface SidebarProps {
  onClose: () => void
}

export function SideBar({ onClose }) {
  const router = useRouter()
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }
  return (
    <Flex
      w="auto"
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
            onClick={() => {
              router.push("/dashboard")
              onClose ? onClose() : null
            }}
          />
          {/* <NavLink
            isActive={router.pathname.startsWith("/dashboard/messages")}
            label="Messages"
            icon={FaRegPaperPlane}
            onClick={() => router.push("/dashboard/messages")}
          /> */}
          <NavLink
            isActive={router.pathname.startsWith("/dashboard/cart")}
            label="Cart"
            icon={FaShoppingCart}
            onClick={() => {
              router.push("/dashboard/cart")
              onClose ? onClose() : null
            }}
          />
          <NavLink
            isActive={router.pathname.startsWith("/dashboard/account")}
            label="Account"
            icon={FaUser}
            onClick={() => {
              router.push("/dashboard/account")
              onClose ? onClose() : null
            }}
          />
        </Stack>
        <Divider />
        <Stack>
          {/* <NavLink
            isActive={router.pathname.startsWith("/dashboard/help")}
            label="Help Center"
            icon={FaRegQuestionCircle}
            onClick={() => router.push("/dashboard/help")}
          /> */}
          <NavLink
            onClick={handleSignOut}
            label="Log Out"
            icon={FaSignOutAlt}
          />
        </Stack>
      </Stack>
    </Flex>
  )
}
