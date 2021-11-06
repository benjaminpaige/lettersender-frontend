import * as Chakra from "@chakra-ui/react"
import { OrderDescription } from "./OrderDescription"
import { getBadgeInfo } from "./utils"
import { formatPrice } from "@/utils"
import { format } from "date-fns"

interface Props extends Chakra.FlexProps {
  label: string
  value: string
}

export const Property = (props: Props) => {
  const { label, value, ...flexProps } = props
  return (
    <Chakra.Flex
      as="dl"
      direction={{ base: "column", sm: "row" }}
      px={{ base: "4", md: "6" }}
      py="4"
      _odd={{ bg: Chakra.useColorModeValue("gray.50", "gray.600") }}
      {...flexProps}
    >
      <Chakra.Box as="dt" minWidth="180px">
        {label}
      </Chakra.Box>
      <Chakra.Box as="dd" flex="1" fontWeight="semibold">
        {value}
      </Chakra.Box>
    </Chakra.Flex>
  )
}

export const OrderItem = ({ item, chargeDate }) => {
  const { badgeColor, badgeText } = getBadgeInfo({
    deliveryDate: item.lobOrderExpectedDeliveryDate,
    chargeDate
  })

  const mailType = getMailType(item.lobOrderMailType)
  const price = formatPrice(item.price)
  const deliveryDate = getExpectedDeliveryDate(
    item.lobOrderExpectedDeliveryDate
  )

  return (
    <>
      <Chakra.Flex
        align="center"
        justify="space-between"
        px={{ base: "4", md: "6" }}
        py="3"
        bg={Chakra.useColorModeValue("gray.100", "gray.700")}
      >
        <Chakra.Text as="h3" fontSize="sm" fontWeight="thin">
          {item.lobOrderType.toUpperCase()}
        </Chakra.Text>
        <Chakra.Badge colorScheme={badgeColor}>{badgeText}</Chakra.Badge>
      </Chakra.Flex>
      <Chakra.Divider />
      <Chakra.Stack
        spacing="6"
        py="5"
        px={{ base: "4", md: "6" }}
        divider={<Chakra.StackDivider />}
      >
        <OrderDescription
          recipient={item.recipientName}
          location={`${item.locality}, ${item.state}`}
          pdfUrl={item.lobOrderPdfUrl}
        />
      </Chakra.Stack>
      <Chakra.Box>
        <Property label="Delivery date" value={deliveryDate} />
        <Property label="Cost" value={price} />
        <Property label="Mail type" value={mailType} />
        <Property label="Carrier" value={item.lobOrderCarrier} />
      </Chakra.Box>
    </>
  )
}

function getMailType(orderMailType) {
  if (orderMailType === "usps_first_class") {
    return "First class"
  }
}

function getExpectedDeliveryDate(date) {
  const d = date.split("-")
  return format(new Date(d[0], d[1] - 1, d[2]), "EEE MMM do, y")
}
