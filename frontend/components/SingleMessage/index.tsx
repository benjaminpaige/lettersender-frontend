import { gql, useQuery } from "@apollo/client"
import MessageImages from "..//MessageImages"

const SINGLE_MESSAGE_QUERY = gql`
  query SINGLE_MESSAGE_QUERY($id: ID!) {
    Message(where: { id: $id }) {
      content
      images {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

export default function SingleMessage({ id }) {
  const { data, error, loading } = useQuery(SINGLE_MESSAGE_QUERY, {
    variables: { id }
  })
  if (loading) return <p>Loading</p>
  return (
    <>
      <p>{data.Message.content}</p>
      <MessageImages message={data.Message} />
    </>
  )
}
