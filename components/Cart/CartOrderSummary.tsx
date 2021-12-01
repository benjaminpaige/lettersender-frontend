import * as Chakra from "@chakra-ui/react"
import { formatPrice } from "@/utils"
import { Checkout } from "@/components/Checkout"

interface CartOrderSummaryProps {
  total: number
}

export const CartOrderSummary = ({ total }: CartOrderSummaryProps) => {
  return (
    <Chakra.Stack
      spacing="8"
      borderWidth="1px"
      rounded="lg"
      padding="8"
      width="full"
      minW="sm"
    >
      <Chakra.Heading size="md">Order Summary</Chakra.Heading>

      <Chakra.Stack spacing="6">
        <Chakra.Flex justify="space-between">
          <Chakra.Text fontSize="lg" fontWeight="semibold">
            Total
          </Chakra.Text>
          <Chakra.Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(total)}
          </Chakra.Text>
        </Chakra.Flex>
      </Chakra.Stack>
      <Chakra.Divider />
      <Checkout />
    </Chakra.Stack>
  )
}
