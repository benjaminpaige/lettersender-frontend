import * as Chakra from "@chakra-ui/react"
import { HiLocationMarker } from "react-icons/hi"
import { µCartItem } from "./types"

export const CartProductMeta: React.FC<µCartItem.Props> = ({ cartItem }) => {
  return (
    <Chakra.Stack direction="row" spacing="5" width="full">
      <Chakra.Box pt="4">
        <Chakra.Stack spacing="0.5">
          <Chakra.Text fontWeight="medium">
            {cartItem.letter.recipientName}
          </Chakra.Text>
          <Chakra.Text
            color={Chakra.useColorModeValue("gray.600", "gray.400")}
            fontSize="sm"
          >
            Letter
          </Chakra.Text>
        </Chakra.Stack>
        <Chakra.HStack
          spacing="1"
          mt="3"
          color={Chakra.useColorModeValue("gray.600", "gray.400")}
          fontSize="sm"
        >
          <Chakra.Icon as={HiLocationMarker} />
          <Chakra.Text>{`${cartItem.letter.locality}, ${cartItem.letter.state}`}</Chakra.Text>
        </Chakra.HStack>
      </Chakra.Box>
    </Chakra.Stack>
  )
}
