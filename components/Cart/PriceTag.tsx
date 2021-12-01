import * as Chakra from "@chakra-ui/react"
import { formatPrice } from "@/utils"

interface PriceTagProps {
  currency: string
  price: number
}

export const PriceTag = ({ price, currency }: PriceTagProps) => {
  return (
    <Chakra.HStack spacing="1">
      <Price>{formatPrice(price, { currency })}</Price>
    </Chakra.HStack>
  )
}

interface PriceProps {
  children?: React.ReactNode
}

const Price = ({ children }: PriceProps) => {
  return (
    <Chakra.Text as="span" fontWeight="medium">
      {children}
    </Chakra.Text>
  )
}
