import { Box, Heading, Stack, StackProps } from "@chakra-ui/react"
import { µFieldGroup } from "./types"

export const FieldGroup: React.FC<µFieldGroup.Props> = (props) => {
  const { title, children, ...flexProps } = props
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing="6"
      py="4"
      {...flexProps}
    >
      <Box minW="3xs">
        {title && (
          <Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0}>
            {title}
          </Heading>
        )}
      </Box>
      {children}
    </Stack>
  )
}
