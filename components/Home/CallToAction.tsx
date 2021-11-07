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
          Ready to Send?
        </Heading>
        <Text mt="4" fontSize="lg">
          Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
          Malesuada adipiscing sagittis vel nulla nec.
        </Text>
        <Link href="/signup">
          <Button
            mt="8"
            as="a"
            href="#"
            size="lg"
            colorScheme="blue"
            fontWeight="bold"
          >
            Get Started
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
