import * as Chakra from "@chakra-ui/react"
import { OrderItem } from "./OrderItem"
import { useQuery } from "@apollo/client"
import { SINGLE_ORDER_QUERY } from "../../graphql"
import { Alert } from "../Alert"

const SingleOrder = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id }
  })

  if (loading || !data) {
    return null
  }

  return (
    <Chakra.Box
      as="section"
      maxW={{ base: "3xl", md: "7xl" }}
      mx="auto"
      p={{ base: "4", md: "12" }}
    >
      <Chakra.Box overflowX="auto">
        <Chakra.Heading size="lg" mb="6">
          Order Details
        </Chakra.Heading>
        {error && <Alert message={error.message} mb="4" />}
        <Chakra.Box maxW={{ base: "xl", md: "7xl" }} mx="auto">
          <Chakra.Box
            bg={Chakra.useColorModeValue("whiteAlpha.400", "gray.600")}
            maxW="3xl"
            mx="auto"
            border="1px"
            borderColor="gray.200"
          >
            {data.Order.items.map((item) => (
              <OrderItem item={item} chargeDate={data.Order.chargeDate} />
            ))}
          </Chakra.Box>
        </Chakra.Box>
      </Chakra.Box>
    </Chakra.Box>
  )
}

export default SingleOrder
