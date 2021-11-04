import { useUser } from "@/hooks/useUser"
import { formatPrice } from "@/utils"
import * as Chakra from "@chakra-ui/react"

interface OrderProps {
  order: Schemas.Order
}

const Order = ({ order }: OrderProps) => {
  return (
    <Chakra.Box>
      <Chakra.Flex as="aside" fontSize="xl" my="4">
        <Chakra.Text>{`${order.items.length} letter${
          order.items.length > 1 ? "s" : ""
        }`}</Chakra.Text>
        <Chakra.Spacer />
        <Chakra.Text>{formatPrice(order.total)}</Chakra.Text>
      </Chakra.Flex>
      <Chakra.Divider />
    </Chakra.Box>
  )
}

export const Orders = () => {
  const me = useUser()
  if (!me.user) return null
  const orders = me.user.orders
  if (orders.length < 1) {
    return
  }

  return (
    <Chakra.Box
      mx="auto"
      maxW="2xl"
      py="2"
      px={{ base: "4", md: "8" }}
      minH="400px"
    >
      <Chakra.Heading as="h1" size="xl" my="8">
        Orders
      </Chakra.Heading>
      {orders.length < 1 ? (
        <Chakra.Heading as="h3" size="md" my="8">
          No orders to show
        </Chakra.Heading>
      ) : (
        <Chakra.Box>
          <Chakra.Heading
            as="h3"
            size="md"
            mt="8"
            mb="4"
          >{`${orders.length} Total`}</Chakra.Heading>
          {orders.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </Chakra.Box>
      )}
    </Chakra.Box>
  )
}
