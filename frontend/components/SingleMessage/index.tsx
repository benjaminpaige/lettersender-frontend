import { gql, useQuery } from "@apollo/client"
import MessageImages from "..//MessageImages"
import { SINGLE_MESSAGE_QUERY } from "../../graphql"
import Loading from "../Loading"
import DisplayError from "../ErrorMessage"

export default function SingleMessage({ id }) {
  const { data, error, loading } = useQuery(SINGLE_MESSAGE_QUERY, {
    variables: { id }
  })
  if (loading) return <Loading />
  if (error && error.message) return <DisplayError />
  return (
    <>
      <p>{data.Message.content}</p>
      <MessageImages message={data.Message} />
    </>
  )
}
