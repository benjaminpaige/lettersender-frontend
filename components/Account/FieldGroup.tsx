import {
  Box,
  BoxProps,
  Text,
  useColorModeValue as mode
} from "@chakra-ui/react"

import { µFieldGroup } from "./types"

export const FieldGroup: React.FC<µFieldGroup.Props> = (props) => {
  const { title, description, ...boxProps } = props
  return (
    <Box>
      <Text fontWeight="semibold">{title}</Text>
      {description && (
        <Text color={mode("gray.600", "gray.400")} fontSize="sm">
          {description}
        </Text>
      )}
      <Box pt="5" {...boxProps} />
    </Box>
  )
}
