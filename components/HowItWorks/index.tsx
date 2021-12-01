import {
  Box,
  Center,
  Heading,
  Img,
  SimpleGrid,
  Stack,
  useColorModeValue as mode
} from "@chakra-ui/react"
import * as React from "react"
import { FaMapMarkerAlt, FaPencilAlt, FaEnvelopeOpenText } from "react-icons/fa"
import { Feature } from "./Feature"
import { CallToAction } from "./CallToAction"
import { NavBar } from "../NavBar"
import { Footer } from "../Footer"

export const HowItWorks = () => {
  return (
    <>
      <NavBar />
      <Box as="section" bg={mode("gray.50", "gray.800")} pt="16" pb="32">
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <Heading
            textAlign="center"
            letterSpacing="tight"
            fontWeight="extrabold"
          >
            Sending real letters is simple with Letter Sender
          </Heading>
          <Box mt="24">
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={{ base: "16", md: "8" }}
            >
              <Stack spacing="12" maxW="lg">
                <Feature
                  icon={<Box as={FaMapMarkerAlt} w="6" h="6" />}
                  title="Address your letter"
                >
                  Designate a recipient and tell us where to send your letter.
                </Feature>
                <Feature
                  icon={<Box as={FaPencilAlt} w="6" h="6" />}
                  title="Write your message"
                >
                  Include a message choosing from a variety of formatting
                  options.
                </Feature>
                <Feature
                  icon={<Box as={FaEnvelopeOpenText} w="6" h="6" />}
                  title="Pay and send"
                >
                  Confirm and you're done. Your letter will get sent out the
                  next business day.
                </Feature>
              </Stack>
              <Center shadow="lg" minH="26rem">
                <Img
                  objectFit="cover"
                  w="full"
                  h="full"
                  src="https://images.unsplash.com/photo-1610850356560-b470d0825d2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                  alt="Holding phone with app installed"
                />
              </Center>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <CallToAction />
      <Footer />
    </>
  )
}
