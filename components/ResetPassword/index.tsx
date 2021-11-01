import {
  Box,
  Heading,
  Text,
  useColorModeValue as mode,
  Center
} from "@chakra-ui/react"
import Logo from "../Logo"
import { ResetForm } from "./ResetForm"

export const ResetPassword = () => {
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
        <Text mt="4" align="center" maxW="md" fontWeight="medium">
          <span>Don&apos;t have an account?</span>
          <Box
            as="a"
            marginStart="1"
            href="/signup"
            color={mode("blue.600", "blue.200")}
            _hover={{ color: "blue.600" }}
            display={{ base: "block", sm: "revert" }}
          >
            Sign Up
          </Box>
        </Text>
      </Box>
      <Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} mt="8" w={{ sm: "full" }}>
        <Box
          bg={mode("white", "gray.700")}
          py="8"
          px={{ base: "4", md: "10" }}
          shadow="base"
          rounded={{ sm: "lg" }}
        >
          <ResetForm />
        </Box>
      </Box>
    </Box>
  )
}
