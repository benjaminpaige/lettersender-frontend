import { CURRENT_USER_QUERY, UPDATE_USER_MUTATION } from "@/graphql"
import { useQuery, useMutation } from "@apollo/client"

export const useUser = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY)
  const [updateUser] = useMutation<Schemas.User>(UPDATE_USER_MUTATION)

  return {
    user: data?.authenticatedItem as Schemas.User,
    updateUser,
    userIsLoading: loading
  }
}

export type UseUser = typeof useUser
export type UseUserReturn = ReturnType<UseUser>
