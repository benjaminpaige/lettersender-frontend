import { Text, TextProps } from "@chakra-ui/layout"
import { APP_NAME } from "@/config"

export const Copyright = (props: TextProps) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} {APP_NAME}, Inc. All rights reserved.
  </Text>
)
