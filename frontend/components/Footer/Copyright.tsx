import { Text, TextProps } from "@chakra-ui/layout"

export const Copyright = (props: TextProps) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} Snail Sender, Inc. All rights reserved.
  </Text>
)
