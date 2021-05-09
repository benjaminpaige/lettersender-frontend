import { Box, Stack, useColorModeValue } from "@chakra-ui/react"
import { AccountSettings } from "./AccountSettings"
import { DangerZone } from "./DangerZone"
import { useUser } from "@/hooks"

export const Account = () => {
  const { user, updateUser } = useUser()

  console.log(user)
  return user ? (
    <Box
      bg={useColorModeValue("gray.50", "gray.800")}
      px={{ base: "4", md: "10" }}
      py="16"
      h="full"
    >
      <Box maxW="xl" mx="auto">
        <Stack spacing="12">
          <AccountSettings user={user} updateUser={updateUser} />
          <DangerZone />
        </Stack>
      </Box>
    </Box>
  ) : (
    <p>No user found</p>
  )
}
