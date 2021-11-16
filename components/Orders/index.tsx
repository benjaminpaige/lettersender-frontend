import * as Chakra from "@chakra-ui/react"
import { useUser } from "@/hooks/useUser"
import { TableContent } from "./TableContent"
import { useRouter } from "next/router"

export const Orders = () => {
  const router = useRouter()
  const { user, userIsLoading } = useUser()

  if (!userIsLoading && !user) router.push("/signin")
  if (!user) return null
  const orders = user.orders

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
        {orders.length > 1 ? (
          <TableContent orders={orders} />
        ) : (
          <Chakra.Text>No orders to show</Chakra.Text>
        )}
      </Chakra.Box>
    </Chakra.Box>
  )
}
