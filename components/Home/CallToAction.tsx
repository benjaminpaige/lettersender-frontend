import { Box, Button, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"

export const CallToAction = () => {
  return (
    <Box as="section">
      <Box
        maxW="2xl"
        mx="auto"
        px={{ base: "6", lg: "8" }}
        py={{ base: "16", sm: "20" }}
        textAlign="center"
      >
        <Heading
          as="h2"
          size="3xl"
          fontWeight="extrabold"
          letterSpacing="tight"
        >
          Pay per letter
        </Heading>
        <Text mt="4" fontSize="lg">
          Only pay for what you use. No subscriptions. No long term commitments.
        </Text>
        <Link href="/pricing">
          <Button
            mt="8"
            as="a"
            href="#"
            size="lg"
            colorScheme="blue"
            fontWeight="bold"
          >
            View Pricing
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
