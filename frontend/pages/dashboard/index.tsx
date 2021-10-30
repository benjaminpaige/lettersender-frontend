import { Dashboard } from "@/components/Dashboard"
import { initializeApollo, addApolloState } from "@/utils/apolloClient"
import { CURRENT_USER_QUERY } from "@/graphql"

export default function DashboardPage() {
  return <Dashboard />
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()
  
  await apolloClient.query({
    query: CURRENT_USER_QUERY
  })
  
  addApolloState(apolloClient, {
    props: {}
  })
}
