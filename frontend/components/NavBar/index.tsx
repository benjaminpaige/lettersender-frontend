import { Box, useColorModeValue as mode } from "@chakra-ui/react"
import { NavContent } from "./NavContent"
import { useUser } from "@/hooks"

export const NavBar = () => {
  const { user } = useUser()
  return (
    <Box>
      <Box
        as="header"
        bg={mode("white", "gray.800")}
        position="relative"
        zIndex="10"
      >
        <Box
          as="nav"
          aria-label="Main navigation"
          maxW="7xl"
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <NavContent.Mobile
            display={{ base: "flex", lg: "none" }}
            isLoggedIn={Boolean(user)}
          />
          <NavContent.Desktop
            display={{ base: "none", lg: "flex" }}
            isLoggedIn={Boolean(user)}
          />
        </Box>
      </Box>
    </Box>
  )
}
