import {
  Box,
  Heading,
  useColorModeValue as mode,
  Center
} from "@chakra-ui/react"
import Logo from "../Logo"
import { RequestResetForm } from "./RequestResetForm"

export const RequestReset = () => {
  return (
    <Box
      minH="100vh"
      py="12"
      px={{ sm: "6", lg: "8" }}
      bg={{ md: mode("gray.100", "inherit") }}
    >
      <Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} w={{ sm: "full" }}>
        <Center>
          <Logo />
        </Center>
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Reset your password
        </Heading>
      </Box>
      <Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} mt="8" w={{ sm: "full" }}>
        <Box
          bg={mode("white", "gray.700")}
          py="8"
          px={{ base: "4", md: "10" }}
          shadow="base"
          rounded={{ sm: "lg" }}
        >
          <RequestResetForm />
        </Box>
      </Box>
    </Box>
  )
}
