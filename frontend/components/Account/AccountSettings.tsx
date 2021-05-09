import {
  HStack,
  Box,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Stack,
  StackDivider,
  useColorMode
} from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { Card } from "./Card"
import { FieldGroup } from "./FieldGroup"
import { HeadingGroup } from "./HeadingGroup"
import { CURRENT_USER_QUERY } from "@/graphql"

interface AccountSettingsProps {
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    dateJoined: string
    darkMode: boolean
    allowMarketingTips: boolean
    allowMarketingUpdates: boolean
  }
  updateUser: (any) => void
}

export const AccountSettings = ({ user, updateUser }: AccountSettingsProps) => {
  const { toggleColorMode, colorMode } = useColorMode()
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = { [e.target.name]: e.target.checked }
    const variables = { id: user.id, ...data }
    if (e.target.name === "darkMode") toggleColorMode()

    updateUser({
      variables,
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })
  }

  return (
    <Stack as="section" spacing="6">
      <HeadingGroup
        title="Account Settings"
        description="Change your profile, display settings, and more"
      />
      <Card>
        <Stack divider={<StackDivider />} spacing="6">
          <FieldGroup
            title="Name &amp; Address"
            description="Change your name and address"
          >
            <Box>
              <Text>
                {user.firstName} {user.lastName}
              </Text>
              <Text color="gray.500" fontSize="sm">
                Joined {user.dateJoined}
              </Text>
            </Box>
            <HStack mt="5">
              <Button size="sm" fontWeight="normal">
                Change name
              </Button>
              <Button size="sm" fontWeight="normal">
                Change address
              </Button>
            </HStack>
          </FieldGroup>

          <FieldGroup
            title="Login Details"
            description="Change your email and password"
          >
            <Text fontSize="sm">{user.email}</Text>
            <HStack mt="5">
              <Button size="sm" fontWeight="normal">
                Change email
              </Button>
              <Button size="sm" fontWeight="normal">
                Change password
              </Button>
            </HStack>
          </FieldGroup>

          <FieldGroup
            title="Display Settings"
            description="Change your display settings"
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              width="full"
              spacing="4"
            >
              <FormControl display="flex" alignItems="center">
                <FormLabel
                  htmlFor="dark-light-mode"
                  flex="1"
                  fontSize="sm"
                  mb="0"
                >
                  Prefer dark mode
                </FormLabel>
                <Switch
                  name="darkMode"
                  onChange={handleSwitchChange}
                  isChecked={colorMode === "dark"}
                  id="dark-light-mode"
                />
              </FormControl>
            </Stack>
          </FieldGroup>

          <FieldGroup
            title="Communications"
            description="Manage your email preference"
          >
            <Stack spacing="3">
              <FormControl display="flex" alignItems="center">
                <FormLabel
                  htmlFor="email-marketing"
                  flex="1"
                  fontSize="sm"
                  mb="0"
                >
                  Product intro, tips, and inspiration
                </FormLabel>
                <Switch
                  name="allowMarketingTips"
                  id="email-marketing"
                  onChange={handleSwitchChange}
                  defaultChecked={user.allowMarketingTips}
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-news" flex="1" fontSize="sm" mb="0">
                  Updates about company news and features
                </FormLabel>
                <Switch
                  id="email-news"
                  name="allowMarketingUpdates"
                  onChange={handleSwitchChange}
                  defaultChecked={user.allowMarketingUpdates}
                />
              </FormControl>
            </Stack>
            <Button mt="5" size="sm" fontWeight="normal">
              Save Changes
            </Button>
          </FieldGroup>
        </Stack>
      </Card>
    </Stack>
  )
}
