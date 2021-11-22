import { Box, Heading, Stack } from "@chakra-ui/react"
import { µFieldGroup } from "."
import * as React from "react"

export const FieldGroup: React.FC<µFieldGroup.Props> = ({
  title,
  children,
  ...flexProps
}) => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing="6"
      py="4"
      {...flexProps}
    >
      <Box minW="160px">
        {title && (
          <Heading fontWeight="semibold" fontSize="lg" flexShrink={0}>
            {title}
          </Heading>
        )}
      </Box>
      {children}
    </Stack>
  )
}
