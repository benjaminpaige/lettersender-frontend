import {
  Heading,
  Stack,
  StackProps,
  Text,
  useColorModeValue
} from "@chakra-ui/react"
import { µHeadingGroup } from "./types"

export const HeadingGroup: React.FC<µHeadingGroup.Props> = (props) => {
  const { title, description, ...stackProps } = props
  return (
    <Stack spacing="1" {...stackProps}>
      <Heading size="md" fontWeight="semibold">
        {title}
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.400")}>
        {description}
      </Text>
    </Stack>
  )
}
