import { NavBar } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue as mode
} from "@chakra-ui/react"
import * as React from "react"
import { HiCheckCircle } from "react-icons/hi"
import { PricingCard } from "./PricingCard"

const FeatureItem: React.FC = ({ children }) => (
  <HStack>
    <Box
      flexShrink={0}
      as={HiCheckCircle}
      fontSize="xl"
      color={mode("blue.500", "blue.300")}
    />
    <Text>{children}</Text>
  </HStack>
)

export const Pricing = () => {
  return (
    <>
      <NavBar />
      <Box as="section" bg={mode("gray.50", "gray.800")} py="20">
        <Box
          maxW={{ base: "xl", md: "5xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <Box maxW="2xl" mx="auto" textAlign={{ sm: "center" }}>
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              letterSpacing="wide"
              mb="3"
              color={mode("gray.600", "gray.400")}
            >
              Pricing
            </Text>
            <Heading
              as="h1"
              size="2xl"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Only pay for what you need
            </Heading>
            <Text mt="6" fontSize="xl" color={mode("gray.600", "gray.400")}>
              No subscriptions. Sign up for free and only pay for the items you
              send.
            </Text>
          </Box>
          <SimpleGrid
            alignItems="flex-start"
            mt="16"
            columns={{ base: 1, lg: 2 }}
            spacing="10"
          >
            <PricingCard
              colorScheme="blue"
              name="Letters"
              price={2}
              duration=" each"
              description="Send letters to anywhere in America"
              features={[
                "Create and send letters in minutes",
                "View letters once created",
                "Know when your letters will be delivered",
                "Your info is confidential and secured"
              ]}
            />
            <PricingCard
              colorScheme="teal"
              name="Postcards (coming soon)"
              price={2}
              duration=" each"
              description="Send postcards to anywhere in America"
              features={[
                "Postcards with your own custom photos",
                "Create and send postcards in minutes",
                "View postcards once created",
                "Know when your postcards will be delivered"
              ]}
            />
          </SimpleGrid>
          <Box
            mt="10"
            bg={mode("white", "gray.700")}
            shadow="md"
            rounded="lg"
            px="10"
            pt="10"
            pb="12"
            mx="auto"
            maxW={{ base: "lg", lg: "unset" }}
          >
            <Text
              color={mode("blue.500", "blue.300")}
              textTransform="uppercase"
              fontWeight="bold"
              letterSpacing="wide"
            >
              Features & Services
            </Text>
            <SimpleGrid columns={{ base: 1, lg: 2 }} mt="5" spacing="5">
              <FeatureItem>Send mail to anyone in America</FeatureItem>
              <FeatureItem>
                Sent the next business day after ordering
              </FeatureItem>
              <FeatureItem>
                No need to buy stamps and envelopes ever again
              </FeatureItem>
              <FeatureItem>
                Track all orders and their expected delivery dates
              </FeatureItem>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  )
}
