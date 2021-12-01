import { Box, SimpleGrid } from "@chakra-ui/react"
import {
  FcPaid,
  FcMultipleDevices,
  FcPrivacy,
  FcTimeline
} from "react-icons/fc"
import { Feature } from "./Feature"

export const Features = () => {
  return (
    <Box as="section" py="24">
      <Box
        maxW={{ base: "xl", md: "5xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="10" spacingY="14">
          <Feature title="Secure and private" icon={<FcPrivacy />}>
            Your letters are always confidential and sent privately in secured
            envelopes.
          </Feature>
          <Feature title="Track delivery date" icon={<FcTimeline />}>
            Know when your letter has been sent, when delivery is expected, and
            when it has arrived at its destination.
          </Feature>
          <Feature title="Pay as you send" icon={<FcPaid />}>
            No subscriptions. No long term commitments. Only pay for the letters
            you send.
          </Feature>
          <Feature
            title="Support for multiple devices"
            icon={<FcMultipleDevices />}
          >
            Compatible with desktop and mobile devices. Send letters to whoever,
            from wherever.
          </Feature>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
