import {
  Box,
  HStack,
  IconButton,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { HiLocationMarker } from "react-icons/hi"
import { FaEye } from "react-icons/fa"

interface OrderDescriptionProps {
  recipient: string
  location: string
  pdfUrl: string
}

export const OrderDescription = (props: OrderDescriptionProps) => {
  const { recipient, location, pdfUrl } = props
  return (
    <Box position="relative">
      <Box fontWeight="bold" maxW="xl">
        {recipient}
      </Box>
      <HStack
        fontSize="sm"
        fontWeight="medium"
        color={mode("gray.500", "white")}
        mt="1"
      >
        <Box as={HiLocationMarker} fontSize="md" color="gray.400" />
        <span>{location}</span>
      </HStack>

      <HStack
        position={{ sm: "absolute" }}
        top={{ sm: "0" }}
        insetEnd={{ sm: "0" }}
        mt={{ base: "4", sm: "0" }}
      >
        <a target="_blank" href={pdfUrl} rel="noopener noreferrer">
          <IconButton
            aria-label="View pdf"
            icon={<FaEye />}
            rounded="full"
            size="sm"
          />
        </a>
      </HStack>
    </Box>
  )
}
