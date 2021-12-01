import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode
} from "@chakra-ui/react"

export const CallToAction = () => {
  return (
    <Box as="section" py="12">
      <Stack
        spacing="6"
        direction={{ base: "column", md: "row" }}
        align={{ md: "center" }}
        justify="space-between"
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Box>
          <Text
            mb="2"
            fontSize="lg"
            fontWeight="semibold"
            color={mode("gray.600", "gray.400")}
          >
            Ready to dive in?
          </Text>
          <Heading size="xl" fontWeight="extrabold" maxW="20ch">
            Start sending real letters in minutes.
          </Heading>
        </Box>
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={{ base: "2", sm: "4" }}
        >
          <Button size="lg" colorScheme="blue" as="a" href="/signup">
            Get Started
          </Button>
          <Button size="lg" as="a" href="/pricing">
            Pricing
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
