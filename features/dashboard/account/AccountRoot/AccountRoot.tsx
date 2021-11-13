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
import { useUser } from "@/hooks"
import { CURRENT_USER_QUERY } from "@/graphql"

import { ChangeAddressModal } from "@/features/dashboard/account/ChangeAddressModal"
import { FieldGroup } from "@/features/dashboard/account/FieldGroup"
import { µAccount } from "@/features/dashboard/account/types"
import { useAccountForm } from "@/features/dashboard/account/hooks"

export const Account = () => {
  const { user, updateUser } = useUser()
  const accountForm = useAccountForm(user)
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!user) {
    return <NoUserFound />
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
        {µAccount.Constants.t_accountSettings}
      </Heading>
      <Box maxWidth="3xl">
        <form
          id="account-settings-form"
          onSubmit={(e) => {
            e.preventDefault()
            const variables = {
              id: user.id,
              ...accountForm.state
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
                  <FormLabel>{µAccount.Constants.t_name}</FormLabel>
                  <Input
                    type="text"
                    maxLength={255}
                    value={accountForm.state.fullName}
                    onChange={(e) =>
                      accountForm.methods.setFullName(e.target.value)
                    }
                  />
                </FormControl>

                <FormControl id="email">
                  <FormLabel>{µAccount.Constants.t_email}</FormLabel>
                  <Input
                    disabled
                    type="email"
                    value={accountForm.state.email}
                    onChange={(e) =>
                      accountForm.methods.setEmail(e.target.value)
                    }
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
                  {µAccount.Constants.t_changeAddress}
                </Button>
              </Flex>
            </FieldGroup>
            <FieldGroup title="Notifications">
              <Stack width="full" spacing="4">
                <Checkbox
                  isChecked={accountForm.state.allowMarketingTips}
                  onChange={(e) =>
                    accountForm.methods.setAllowMarketingTips(e.target.checked)
                  }
                >
                  {µAccount.Constants.t_allowMarketingTips}
                </Checkbox>
                <Checkbox
                  isChecked={accountForm.state.allowMarketingUpdates}
                  onChange={(e) =>
                    accountForm.methods.setAllowMarketingUpdates(
                      e.target.checked
                    )
                  }
                >
                  {µAccount.Constants.t_allowMarketingUpdates}
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
                disabled={!accountForm.state.isChanged}
                w={{ base: "full", md: "unset" }}
              >
                {µAccount.Constants.t_saveChanges}
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
