import { useUser } from "@/hooks/useUser"
import * as Chakra from "@chakra-ui/react"
import { CartItem } from "./CartItem"
import { CartOrderSummary } from "./CartOrderSummary"

const CartHeader = ({ num }: { num: Number }) => (
  <Chakra.Heading size="lg">
    {`Cart ${num ? `(${num} item${num === 1 ? "" : "s"})` : ""}`}
  </Chakra.Heading>
)
const Cart = () => {
  const me = useUser()
  if (!me.user) return null
  const totalPrice = me.user.cart.reduce(
    (total, cartItem) => total + cartItem.letter.price,
    0
  )

  const numItemsInCart = me.user.cart.length

  return (
    <Chakra.Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "8", md: "12" }}
      py={{ base: "8", md: "12" }}
    >
      {numItemsInCart === 0 ? (
        <>
          <CartHeader num={numItemsInCart} />
          <Chakra.Text mt="6">No items in cart</Chakra.Text>
        </>
      ) : (
        <Chakra.Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "4", lg: "16" }}
        >
          <Chakra.Flex direction="column" flex="1">
            <CartHeader num={numItemsInCart} />
            <Chakra.Stack spacing="6" my="4">
              {me.user.cart.map((item) => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </Chakra.Stack>
          </Chakra.Flex>
          <Chakra.Flex
            direction="column"
            align="center"
            flex="1"
            maxW={{ base: "none", lg: "sm" }}
          >
            <CartOrderSummary total={totalPrice} />
            <Chakra.HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Chakra.Link
                color={Chakra.useColorModeValue("blue.500", "blue.200")}
              >
                send more letters
              </Chakra.Link>
            </Chakra.HStack>
          </Chakra.Flex>
        </Chakra.Stack>
      )}
    </Chakra.Box>
  )
}

export default Cart
