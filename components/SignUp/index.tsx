import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode
} from "@chakra-ui/react"
// import { FaFacebook, FaGoogle } from "react-icons/fa"
import { useRouter } from "next/router"
// import { DividerWithText } from "./DividerWithText"
import Logo from "../Logo"
import { SignupForm } from "./SignupForm"

export const SignUp: React.FC = () => {
  const router = useRouter()
  return (
    <Box minH="100vh" bg={{ md: mode("gray.100", "inherit") }}>
      <Box
        maxW="6xl"
        mx="auto"
        py={{ base: "10", md: "20" }}
        px={{ base: "4", md: "10" }}
      >
        <Box w="full" maxW="lg" mx="auto">
          <Box
            bg={{ md: mode("white", "gray.700") }}
            rounded={{ md: "2xl" }}
            p={{ base: "4", md: "12" }}
            borderWidth={{ md: "1px" }}
            borderColor={mode("gray.200", "transparent")}
            shadow={{ md: "lg" }}
          >
            <Logo />
            <Text
              mt="2"
              fontSize="lg"
              color={mode("gray.600", "gray.400")}
              fontWeight="medium"
            >
              Enter your info to get started
            </Text>
            <Divider my="4"/>
            {/* <Stack spacing="4">
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

            <DividerWithText>or</DividerWithText> */}
            <SignupForm />
          </Box>

          <Text mt="8" align="center" fontWeight="medium">
            Already have an account?{" "}
            <Box
              as="a"
              href="#"
              color={mode("blue.600", "blue.200")}
              display={{ base: "block", md: "inline-block" }}
              onClick={() => router.push("/signin")}
            >
              Log in
            </Box>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
