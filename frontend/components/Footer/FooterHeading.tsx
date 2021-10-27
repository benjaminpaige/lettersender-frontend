import { Heading, useColorModeValue } from "@chakra-ui/react"
import { µFooterHeading } from "./types"

export const FooterHeading: React.FC<µFooterHeading.Props> = (props) => (
  <Heading
    as="h4"
    color={useColorModeValue("gray.600", "gray.400")}
    fontSize="sm"
    fontWeight="semibold"
    textTransform="uppercase"
    letterSpacing="wider"
    {...props}
  />
)
