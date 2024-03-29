import { Text, TextProps } from "@chakra-ui/layout"
import { APP_NAME } from "@/config"
import { µCopyright } from "./types"

export const Copyright: React.FC<µCopyright.Props> = (props) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} {APP_NAME}, Inc. All rights reserved.
  </Text>
)
