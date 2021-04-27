import { Box, useColorModeValue as mode } from "@chakra-ui/react"
import { NavContent } from "./NavContent"
import { useUser } from "@/hooks"
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from "@/graphql"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"

export const NavBar = () => {
  const { user } = useUser()
  const router = useRouter()
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
  const handleSignOut = async () => {
    router.push("/signin")

    // to prevent flashing of call to action button text
    await new Promise((resolve) => setTimeout(resolve, 1000))
    signOut()
  }

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
            isSignedIn={Boolean(user)}
            handleSignOut={handleSignOut}
          />
          <NavContent.Desktop
            display={{ base: "none", lg: "flex" }}
            isSignedIn={Boolean(user)}
            handleSignOut={handleSignOut}
          />
        </Box>
      </Box>
    </Box>
  )
}
