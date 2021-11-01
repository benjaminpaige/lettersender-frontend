import {
  CircularProgress,
  Flex,
  Center,
  useColorModeValue as mode
} from "@chakra-ui/react"

export const Loading = () => {
  return (
    <Flex h="100%" bg={{ md: mode("gray.100", "inherit") }}>
      <Center m="auto">
        <CircularProgress isIndeterminate />
      </Center>
    </Flex>
  )
}
