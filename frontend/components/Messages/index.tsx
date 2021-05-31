import { useQuery } from "@apollo/client"
import { ALL_MESSAGES_QUERY } from "@/graphql"
import { Loading } from "../Loading"
import { useRouter } from "next/router"
import { Box, Heading } from "@chakra-ui/react"
import { TableActions } from "./TableActions"
import { TableContent } from "./TableContent"
import { TablePagination } from "./TablePagination"
import { perPage } from "@/config"

export const Messages = () => {
  const { query } = useRouter()
  const page = parseInt(query.page as string) || 1

  const { data, error, loading } = useQuery(ALL_MESSAGES_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage
    }
  })

  if (loading) return <Loading />
  return (
    <Box as="section" p="12">
      <Box
        maxW={{ base: "xl", md: "6xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Box overflowX="auto">
          <Heading size="lg" mb="6">
            Messages
          </Heading>
          <TableActions />
          <TableContent messages={data?.authenticatedItem?.messages} />
          <TablePagination page={page} />
        </Box>
      </Box>
    </Box>
  )
}
