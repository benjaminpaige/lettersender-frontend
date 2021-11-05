import * as Chakra from "@chakra-ui/react"
import { useUser } from "@/hooks/useUser"
import { TableContent } from "./TableContent"

export const Orders = () => {
  const me = useUser()
  if (!me.user) return null
  const orders = me.user.orders
  if (orders.length < 1) {
    return
  }

  return (
    <Chakra.Box
      as="section"
      maxW={{ base: "3xl", md: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "12" }}
      py={{ base: "4", md: "12" }}
    >
      <Chakra.Box overflowX="auto">
        <Chakra.Heading size="lg" mb="6">
          Orders
        </Chakra.Heading>
        <TableContent orders={orders} />
      </Chakra.Box>
    </Chakra.Box>
  )
}
