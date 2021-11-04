import * as Chakra from "@chakra-ui/react"
import { PriceTag } from "./PriceTag"
import { CartProductMeta } from "./CartProductMeta"
import { REMOVE_FROM_CART_MUTATION } from "@/graphql"
import { useMutation, Cache } from "@apollo/client"
import { µCartItem } from "./types"

export const CartItem: React.FC<µCartItem.Props> = ({ cartItem }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id: cartItem.id },

    // optimistic update
    update(cache, payload) {
      cache.evict(
        cache.identify(payload.data.deleteCartItem) as Cache.EvictOptions
      )
    }
  })

  return (
    <Chakra.Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
      maxW={{ base: "none", lg: "lg" }}
    >
      <CartProductMeta cartItem={cartItem} />

      {/* Desktop */}
      <Chakra.Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <PriceTag price={cartItem.letter.price} currency={"USD"} />
        <Chakra.CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={(e) => removeFromCart()}
          disabled={loading}
        />
      </Chakra.Flex>

      {/* Mobile */}
      <Chakra.Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Chakra.Link
          fontSize="sm"
          textDecor="underline"
          disabled={loading}
          onClick={(e) => removeFromCart()}
        >
          Delete
        </Chakra.Link>
        <PriceTag price={cartItem.letter.price} currency={"USD"} />
      </Chakra.Flex>
    </Chakra.Flex>
  )
}
