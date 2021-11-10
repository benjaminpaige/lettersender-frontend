import { useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Flex,
  Input,
  Stack,
  Spacer,
  StackDivider,
  VStack,
  Divider,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { ChangeAddressModal } from "./ChangeAddressModal"
import { FieldGroup } from "./FieldGroup"
import { useUser } from "@/hooks"
import { CURRENT_USER_QUERY } from "@/graphql"

export const Account = () => {
  const { user, updateUser } = useUser()
  const [fullName, setFullName] = useState(user?.fullName)
  const [email, setEmail] = useState(user?.email)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [allowMarketingTips, setAllowMarketingTips] = useState(
    user?.allowMarketingTips
  )
  const [allowMarketingUpdates, setAllowMarketingUpdates] = useState(
    user?.allowMarketingUpdates
  )

  if (!user) {
    return <NoUserFound />
  }

  if (
    fullName.trim() !== user.fullName ||
    allowMarketingTips !== user.allowMarketingTips ||
    allowMarketingUpdates !== user.allowMarketingUpdates
  ) {
    var isChanged = true
  }

  return (
    <Box
      as="section"
      maxW={{ base: "3xl", md: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "12" }}
      py={{ base: "4", md: "12" }}
    >
      <Heading size="lg" mb="6">
        Account Settings
      </Heading>
      <Box maxWidth="3xl">
        <form
          id="account-settings-form"
          onSubmit={(e) => {
            e.preventDefault()
            const variables = {
              id: user.id,
              email,
              fullName,
              allowMarketingTips,
              allowMarketingUpdates
            }
            updateUser({
              variables,
              refetchQueries: [{ query: CURRENT_USER_QUERY }]
            })
          }}
        >
          <Divider />
          <Stack spacing="4" divider={<StackDivider />}>
            <FieldGroup title="Personal Info">
              <VStack width="full" spacing="6">
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    maxLength={255}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </FormControl>

                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    disabled
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </VStack>
            </FieldGroup>
            <FieldGroup title="Address">
              <Flex w="full">
                <Stack w="full" fontSize="sm" spacing="0">
                  <Text>{user.addressLine1}</Text>
                  {user.addressLine2 && <Text>{user.addressLine2}</Text>}
                  <Text mt="none">{`${user.locality}, ${user.state} ${user.postcode}`}</Text>
                </Stack>
                <Spacer />
                <Button colorScheme="green" minW="unset" onClick={onOpen}>
                  Change Address
                </Button>
              </Flex>
            </FieldGroup>
            <FieldGroup title="Notifications">
              <Stack width="full" spacing="4">
                <Checkbox
                  isChecked={allowMarketingTips}
                  onChange={(e) => setAllowMarketingTips(e.target.checked)}
                >
                  Product intro, tips, and inspiration.
                </Checkbox>
                <Checkbox
                  isChecked={allowMarketingUpdates}
                  onChange={(e) => setAllowMarketingUpdates(e.target.checked)}
                >
                  Updates about company news and features
                </Checkbox>
              </Stack>
            </FieldGroup>
          </Stack>
          <Divider mt="4" />
          <FieldGroup mt="4">
            <HStack width="full">
              <Button
                type="submit"
                colorScheme="blue"
                disabled={!isChanged}
                w={{ base: "full", md: "unset" }}
              >
                Save Changes
              </Button>
            </HStack>
          </FieldGroup>
        </form>
      </Box>
      <ChangeAddressModal
        isOpen={isOpen}
        onClose={onClose}
        updateUser={updateUser}
        id={user.id}
      />
    </Box>
  )
}

function NoUserFound() {
  return (
    <Box
      maxW={{ base: "3xl", md: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "12" }}
      py={{ base: "4", md: "12" }}
    >
      <Heading size="lg" mb="6">
        Account Settings
      </Heading>
      <Text>No user found</Text>
    </Box>
  )
}
