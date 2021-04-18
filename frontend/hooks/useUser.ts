import { CURRENT_USER_QUERY } from "@/graphql"
import { useQuery } from "@apollo/client"

export const useUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  return data?.authenticatedItem
}
