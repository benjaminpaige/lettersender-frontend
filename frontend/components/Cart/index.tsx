import { useUser } from "@/hooks/useUser"
import * as Chakra from "@chakra-ui/react"
import { REMOVE_FROM_CART_MUTATION } from "@/graphql"
import { useMutation, Cache } from "@apollo/client"
import { Checkout } from "@/components/Checkout"
import { µCartItem, µRemoveCartItem } from "./types"

const RemoveCartItem: React.FC<µRemoveCartItem.Props> = ({ cartItemId }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id: cartItemId },

    // optimistic update
    update(cache, payload) {
      cache.evict(
        cache.identify(payload.data.deleteCartItem) as Cache.EvictOptions
      )
    }
  })

  const handleRemoveFromCart = () => {
    removeFromCart()
  }

  return (
    <Chakra.Button
      size="sm"
      variant="outline"
      disabled={loading}
      onClick={handleRemoveFromCart}
    >
      X
    </Chakra.Button>
  )
}

const CartItem: React.FC<µCartItem.Props> = ({ cartItem }) => {
  return (
    <Chakra.Flex
      py="2"
      my="2"
      px="2"
      backgroundColor={Chakra.useColorModeValue("gray.100", "gray.600")}
      borderRadius="md"
    >
      <Chakra.Box fontSize="small">
        <Chakra.Text>{cartItem.letter.recipientName}</Chakra.Text>
        <Chakra.Text>{cartItem.letter.addressLine1}</Chakra.Text>
        <Chakra.Text>{cartItem.letter.addressLine2}</Chakra.Text>
        <Chakra.Text>{`${cartItem.letter.locality} ${cartItem.letter.state} ${cartItem.letter.postcode}`}</Chakra.Text>
      </Chakra.Box>
      <Chakra.Spacer />
      <Chakra.Box>
        <RemoveCartItem cartItemId={cartItem.id} />
      </Chakra.Box>
    </Chakra.Flex>
  )
}

const Cart = () => {
  const me = useUser()
  if (!me.user) return null

  return (
    <Chakra.Box
      mx="auto"
      maxW="2xl"
      py="2"
      px={{ base: "4", md: "8" }}
      minH="400px"
    >
      <Chakra.Heading as="h1" size="xl" my="8">
        Cart
      </Chakra.Heading>
      {me.user.cart.map((cartItem) => {
        return <CartItem key={cartItem.id} cartItem={cartItem} />
      })}
      {me.user.cart.length > 0 ? (
        <Chakra.Box>
          <Chakra.Divider py="2" />
          <Chakra.Flex py="2">
            <Chakra.Heading as="h3" size="md">
              Total
            </Chakra.Heading>
            <Chakra.Spacer />
            <Chakra.Heading as="h3" size="md">
              ${2 * me.user.cart.length}
            </Chakra.Heading>
          </Chakra.Flex>
          <Checkout />
        </Chakra.Box>
      ) : (
        <Chakra.Heading as="h3" size="md">
          No Items in Cart
        </Chakra.Heading>
      )}
    </Chakra.Box>
  )
}

export default Cart
