import { useQuery } from "@apollo/client"
import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { MESSAGES_PAGINATION_QUERY } from "../../graphql"

export const TablePagination = ({ numMessages }: { numMessages: number }) => {
  const { data, error, loading } = useQuery(MESSAGES_PAGINATION_QUERY)

  if (loading || error) return null
  return (
    <Flex align="center" justify="space-between">
      <Text color={mode("gray.600", "gray.400")} fontSize="sm">
        {data._allMessagesMeta.count} messages
      </Text>
      <ButtonGroup variant="outline" size="sm">
        <Button as="a" rel="prev">
          Previous
        </Button>
        <Button as="a" rel="next">
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  )
}
