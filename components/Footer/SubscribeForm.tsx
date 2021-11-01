import {
  Button,
  chakra,
  Input,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react"
import { FooterHeading } from "./FooterHeading"
import { µSubscribeForm } from "./types"

export const SubscribeForm: React.FC<µSubscribeForm.Props> = (props) => {
  return (
    <chakra.form {...props} onSubmit={(e) => e.preventDefault()}>
      <Stack spacing="4">
        <FooterHeading>Subscribe to our newsletter</FooterHeading>
        <Text>
          Get notified when we add new features or we have exciting news for
          you.
        </Text>
        <Stack spacing="4" direction={{ base: "column", md: "row" }}>
          <Input
            bg={useColorModeValue("white", "inherit")}
            placeholder="Enter your email"
            type="email"
            required
            focusBorderColor={useColorModeValue("blue.500", "blue.300")}
            _placeholder={{
              opacity: 1,
              color: useColorModeValue("gray.500", "whiteAlpha.700")
            }}
          />
          <Button
            type="submit"
            colorScheme="blue"
            flexShrink={0}
            width={{ base: "full", md: "auto" }}
          >
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </chakra.form>
  )
}
