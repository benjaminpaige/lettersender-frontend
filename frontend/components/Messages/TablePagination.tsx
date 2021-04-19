import Link from "next/link"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { MESSAGES_PAGINATION_QUERY } from "../../graphql"
import { perPage } from "../../config"

type TablePaginationProps = { page: number }

export const TablePagination = ({ page }: TablePaginationProps) => {
  const { data, error, loading } = useQuery(MESSAGES_PAGINATION_QUERY)

  if (loading || error) return null

  const { count } = data._allMessagesMeta
  const pageCount = Math.ceil(count / perPage)

  const multipleMessages = count > 1
  const multiplePages = pageCount > 1

  return (
    <Flex align="center" justify="space-between">
      <Text color={mode("gray.600", "gray.400")} fontSize="sm">
        {`${count} message${multipleMessages ? "s" : ""}`}
        {multiplePages
          ? ` - Page ${page} of
        ${pageCount}`
          : ""}
      </Text>
      <ButtonGroup variant="outline" size="sm">
        {page !== 1 && (
          <Link href={`/dashboard/messages/${page - 1}`}>
            <Button rel="prev">Previous</Button>
          </Link>
        )}

        <Link href={`/dashboard/messages/${page + 1}`}>
          <Button rel="next" disabled={page === pageCount}>
            Next
          </Button>
        </Link>
      </ButtonGroup>
    </Flex>
  )
}
