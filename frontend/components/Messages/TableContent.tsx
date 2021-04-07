import Link from "next/link"
import {
  Avatar,
  Badge,
  Button,
  Center,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode
} from "@chakra-ui/react"
import * as React from "react"
import { useRouter } from "next/router"

export const TableContent = ({ messages }) => {
  const router = useRouter()
  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode("gray.50", "gray.800")}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {messages.map((row, index) => (
          <Tr key={index}>
            {columns.map((column, index) => {
              const cell = row[column.accessor as keyof typeof row]
              const element = column.Cell?.(cell) ?? cell
              return (
                <Td
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "250px"
                  }}
                  className="pointer"
                  onClick={() => router.push(`/message/${row.id}`)}
                  whiteSpace="nowrap"
                  key={index}
                >
                  {element}
                </Td>
              )
            })}
            <Td textAlign="right">
              <Button variant="link" colorScheme="blue">
                <Link href={`/message/${row.id}`}>Edit</Link>
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

const badgeEnum: Record<string, string> = {
  SENT: "green",
  DRAFT: "orange",
  PENDING: "red"
}

const columns = [
  {
    Header: "Recipient",
    accessor: "recipientName"
  },
  {
    Header: "Address",
    accessor: "recipientAddress"
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: function StatusCell(data: any) {
      return (
        <Badge fontSize="xs" colorScheme={badgeEnum[data]}>
          {data}
        </Badge>
      )
    }
  },
  {
    Header: "Message",
    accessor: "content"
  },
  {
    Header: "Images",
    accessor: "images",
    Cell: function ImgQantity(data: any) {
      const numberOfImages = data.filter((_) => _.image).length.toString()
      return (
        <Center>
          <Avatar size="xs" bg="gray.500" name={numberOfImages} />
        </Center>
      )
    }
  }
]
