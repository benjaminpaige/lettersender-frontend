import { CheckIcon } from "@chakra-ui/icons"
import {
  Box,
  BoxProps,
  Circle,
  Collapse,
  Heading,
  HStack,
  Icon,
  useColorModeValue
} from "@chakra-ui/react"
import * as React from "react"
import { useStep } from "./useStep"
import { µStep } from "./types"

export const Step: React.FC<µStep.Props> = ({
  title,
  children,
  ...boxProps
}) => {
  const { isActive, isCompleted, step } = useStep()

  const accentColor = useColorModeValue("blue.500", "blue.300")
  const mutedColor = useColorModeValue("gray.600", "whiteAlpha.800")
  const activeColor = useColorModeValue("white", "black")

  return (
    <Box {...boxProps}>
      <HStack spacing="4">
        <Circle
          size="8"
          fontWeight="bold"
          color={
            isActive ? activeColor : isCompleted ? accentColor : mutedColor
          }
          bg={isActive ? accentColor : "transparent"}
          borderColor={isCompleted ? accentColor : "inherit"}
          borderWidth={isActive ? "0px" : "1px"}
        >
          {isCompleted ? <Icon as={CheckIcon} /> : step}
        </Circle>
        <Heading
          fontSize="lg"
          fontWeight="semibold"
          color={isActive || isCompleted ? "inherit" : mutedColor}
        >
          {title}
        </Heading>
      </HStack>
      <Collapse in={isActive}>{children}</Collapse>
    </Box>
  )
}
