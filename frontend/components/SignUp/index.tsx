import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { FaFacebook, FaGoogle } from "react-icons/fa"
import { DividerWithText } from "./DividerWithText"
import { Logo } from "../Logo"
import { SignupForm } from "./SignupForm"

export const SignUp: React.FC = () => {
  return (
    <Box minH="100vh" bg={{ md: mode("gray.100", "inherit") }}>
      <Box
        maxW="6xl"
        mx="auto"
        py={{ base: "10", md: "20" }}
        px={{ base: "4", md: "10" }}
      >
        <Box w="full" maxW="xl" mx="auto">
          <Box
            bg={{ md: mode("white", "gray.700") }}
            rounded={{ md: "2xl" }}
            p={{ base: "4", md: "12" }}
            borderWidth={{ md: "1px" }}
            borderColor={mode("gray.200", "transparent")}
            shadow={{ md: "lg" }}
          >
            <Logo
              h="6"
              mb={{ base: "16", md: "10" }}
              iconColor="blue.600"
              mx={{ base: "auto", md: "unset" }}
            />
            <Box mb="8" textAlign={{ base: "center", md: "start" }}>
              <Heading size="lg" mb="2" fontWeight="extrabold">
                Welcome to Fire Mail
              </Heading>
              <Text
                fontSize="lg"
                color={mode("gray.600", "gray.400")}
                fontWeight="medium"
              >
                Enter your info to get started
              </Text>
            </Box>
            <Stack spacing="4">
              <Button
                variant="outline"
                leftIcon={<Box as={FaGoogle} color="red.500" />}
              >
                Sign up with Google
              </Button>
              <Button
                variant="outline"
                leftIcon={
                  <Box
                    as={FaFacebook}
                    color={mode("facebook.500", "facebook.300")}
                  />
                }
              >
                Sign up with Facebook
              </Button>
            </Stack>

            <DividerWithText>or</DividerWithText>
            <SignupForm />
          </Box>

          <Text mt="8" align="center" fontWeight="medium">
            Already have an account?{" "}
            <Box
              as="a"
              href="#"
              color={mode("blue.600", "blue.200")}
              display={{ base: "block", md: "inline-block" }}
            >
              Log in to Fire Mail
            </Box>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
