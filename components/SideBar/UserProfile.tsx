import { Avatar, Flex, HStack, Text } from "@chakra-ui/react"

interface UserProfileProps {
  name: string
  image: string
  email: string
}

export const UserProfile = (props: UserProfileProps) => {
  const { name, image, email } = props
  return (
    <HStack spacing="4" px="2">
      <Flex direction="column">
        <Text fontWeight="medium">{name}</Text>
        <Text fontSize="sm" lineHeight="shorter">
          {email}
        </Text>
      </Flex>
    </HStack>
  )
}
