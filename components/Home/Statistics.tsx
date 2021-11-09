import {
  Box,
  Button,
  Center,
  Heading,
  LightMode,
  SimpleGrid,
  Text
} from "@chakra-ui/react"

export const Statistics = () => {
  return (
    <Box
      as="section"
      bg="gray.800"
      py="12"
      position="relative"
      h={{ base: "560px", md: "640px" }}
      bgImage="url(https://images.unsplash.com/photo-1573164713619-24c711fe7878?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80)"
      bgSize="cover"
      bgPosition="center"
      _after={{
        content: `""`,
        display: "block",
        w: "full",
        h: "full",
        bg: "blackAlpha.700",
        position: "absolute",
        inset: 0,
        zIndex: 0
      }}
    >
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
        h="full"
        zIndex={1}
        position="relative"
      >
        <Center
          flexDirection="column"
          textAlign="center"
          color="white"
          h="full"
        >
          <Heading size="2xl" fontWeight="extrabold">
            Start Sending Today
          </Heading>
          <Text fontSize="lg" fontWeight="medium" mt="3">
            Getting started is easy. Sign up for free. Send in minutes
          </Text>
          <LightMode>
            <Button
              colorScheme="blue"
              size="lg"
              mt="6"
              as="a"
              href="/how-it-works"
              fontWeight="bold"
              fontSize="md"
            >
              How it works
            </Button>
          </LightMode>
        </Center>
      </Box>
      <Box
        display={{ base: "none", md: "block" }}
        position="absolute"
        zIndex={2}
        w="full"
        bottom="0"
        py="4"
        bg="blackAlpha.400"
      >
        {/* <Box maxW={{ base: "xl", md: "7xl" }} mx="auto">
          <SimpleGrid columns={{ base: 1, md: 1 }}>
            <Box textAlign="center" color="white">
              <Text>Letters Sent</Text>
              <Text fontSize="3xl">+100k</Text>
            </Box>
          </SimpleGrid>
        </Box> */}
      </Box>
    </Box>
  )
}
