import { Box, useColorModeValue } from "@chakra-ui/react"
import { µCard } from "./types"

export const Card: React.FC<µCard.Props> = (props) => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    shadow="base"
    rounded="lg"
    p={{ base: "4", md: "8" }}
    {...props}
  />
)
