import Link from "next/link"
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { formatMoney } from "../../utils"
import MessageImages from "../MessageImages"

export const ALL_MESSAGES_QUERY = gql`
  query ALL_MESSAGES_QUERY {
    allMessages {
      id
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

export default function Messages() {
  const { data, error, loading } = useQuery(ALL_MESSAGES_QUERY)
  if (loading) return <p>Loading</p>
  return data?.allMessages?.map((message) => {
    return (
      <div key={message.id}>
        <Link href={`/message/${message.id}`}>
          <p style={{ padding: "1em" }}>{message.content}</p>
        </Link>
        <MessageImages message={message} />
        <p>{formatMoney(2400)}</p>
      </div>
    )
  })
}
