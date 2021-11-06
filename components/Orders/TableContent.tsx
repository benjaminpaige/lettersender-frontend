import * as Chakra from "@chakra-ui/react"
import Link from "next/link"
import { Badge, Text } from "@chakra-ui/react"
import { formatTime, formatPrice } from "@/utils"

interface TableContentProps {
  orders: Schemas.Order[]
}

export const formatOrders = (orders: Schemas.Order[]) =>
  orders.map((order) => ({
    date: order.chargeDate,
    status: order.paymentStatus,
    total: order.total,
    id: order.id
  }))

const badgeColorEnum: Record<string, string> = {
  succeeded: "green",
  failed: "red"
}

const badgeTextEnum: Record<string, string> = {
  succeeded: "Paid",
  failed: "Fail"
}

export const columns = [
  {
    Header: "Date",
    accessor: "date",
    Cell: function DateCell(data: any) {
      return <Text fontWeight="bold">{formatTime(data)}</Text>
    }
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: function StatusCell(data: string) {
      return (
        <Badge fontSize="xs" colorScheme={badgeColorEnum[data]}>
          {badgeTextEnum[data]}
        </Badge>
      )
    }
  },
  {
    Header: "Total",
    accessor: "total",
    Cell: function TotalCell(data: number) {
      return <Text>{formatPrice(data)}</Text>
    }
  }
]

export const TableContent = ({ orders }: TableContentProps) => {
  const data = formatOrders(orders)
  return (
    <Chakra.Table borderWidth="1px" fontSize="sm">
      <Chakra.Thead bg={Chakra.useColorModeValue("gray.50", "gray.800")}>
        <Chakra.Tr>
          {columns.map((column, index) => (
            <Chakra.Th
              textAlign="center"
              whiteSpace="nowrap"
              scope="col"
              key={index}
              px={1}
            >
              {column.Header}
            </Chakra.Th>
          ))}
          <Chakra.Th />
        </Chakra.Tr>
      </Chakra.Thead>
      <Chakra.Tbody>
        {data.map((row, index) => (
          <Chakra.Tr key={index}>
            {columns.map((column, index) => {
              const cell = row[column.accessor as keyof typeof row]
              const element = column.Cell?.(cell) ?? cell
              return (
                <Chakra.Td
                  textAlign="center"
                  whiteSpace="nowrap"
                  key={"table_data_" + index}
                  px={1}
                >
                  {element}
                </Chakra.Td>
              )
            })}
            <Chakra.Td textAlign="center" px={1}>
              <Link href={`/dashboard/order/${row.id}`}>
                <Chakra.Button variant="link" colorScheme="blue">
                  view
                </Chakra.Button>
              </Link>
            </Chakra.Td>
          </Chakra.Tr>
        ))}
      </Chakra.Tbody>
    </Chakra.Table>
  )
}
