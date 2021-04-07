import { useQuery } from "@apollo/client"
import { ALL_MESSAGES_QUERY } from "../../graphql"
import Loading from "../Loading"

import { Box, Heading } from "@chakra-ui/react"
import { TableActions } from "./TableActions"
import { TableContent } from "./TableContent"
import { TablePagination } from "./TablePagination"

export const Messages = () => {
  const { data, error, loading } = useQuery(ALL_MESSAGES_QUERY)

  if (loading) return <Loading />
  return (
    <Box as="section" py="12">
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Box overflowX="auto">
          <Heading size="lg" mb="6">
            Messages
          </Heading>
          <TableActions />
          <TableContent messages={data.allMessages} />
          <TablePagination numMessages={data.allMessages.length} />
        </Box>
      </Box>
    </Box>
  )
}
